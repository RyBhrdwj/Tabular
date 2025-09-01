import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import syncService from "../../services/syncService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddSheet({ onAdd }) {
  return (
    <div className="w-full flex my-4 flex-row-reverse items-stretch justify-end">
      <button
        className="bg-blue-600 text-lg text-white px-6 py-2 rounded-full hover:outline active:scale-95 transition-all duration-100"
        onClick={onAdd}
      >
        Add Sheet
      </button>
    </div>
  );
}

// Sheet skeleton for loading state
function SheetSkeleton() {
  return (
    <ul className="flex flex-col gap-6 animate-pulse">
      {Array.from({ length: 3 }).map((_, idx) => (
        <li
          key={idx}
          className="w-full group bg-gradient-to-br from-[#0A090F]/80 to-[#112120]/80 rounded-2xl shadow-2xl px-6 py-3 flex items-center gap-6 border border-white/10 relative overflow-hidden"
          style={{
            boxShadow: "0 12px 40px 0 rgba(31, 38, 135, 0.25)",
            border: "1.5px solid rgba(255,255,255,0.10)",
          }}
        >
          <div className="absolute inset-0 bg-white/5 backdrop-blur-[6px] opacity-80 rounded-2xl z-0" />
          <div className="relative z-10 flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-tr from-[#4e54c8] to-[#8f94fb] flex items-center justify-center shadow-md">
            <div className="w-8 h-8 bg-white/20 rounded-md" />
          </div>
          <div className="relative z-10 flex-1 min-w-0">
            <div className="h-6 bg-white/20 rounded w-2/3 mb-2" />
            <div className="h-4 bg-white/10 rounded w-1/3" />
          </div>
          <div className="relative z-10 ml-4">
            <div className="w-6 h-6 bg-white/10 rounded-full" />
          </div>
        </li>
      ))}
    </ul>
  );
}

// Sheet list item
function SheetListItem({
  sheet,
  onClick,
  isEditing,
  editValue,
  onEditStart,
  onEditChange,
  onEditBlur,
  onEditKeyDown,
}) {
  return (
    <li
      key={sheet.id}
      className="w-full group bg-gradient-to-br from-[#0A090F]/80 to-[#112120]/80 rounded-2xl shadow-2xl px-6 py-3 flex items-center gap-6 border border-white/10 hover:shadow-3xl hover:border-white/20 transition-all duration-200 cursor-pointer relative overflow-hidden"
      onClick={onClick}
    >
      {/* Glassmorphism floating effect */}
      <div className="absolute inset-0 bg-white/5 backdrop-blur-[6px] opacity-80 group-hover:opacity-100 transition-all duration-300 pointer-events-none rounded-2xl z-0" />
      <div className="relative z-10 flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-tr from-[#4e54c8] to-[#8f94fb] flex items-center justify-center shadow-md">
        <svg
          width="32"
          height="32"
          fill="none"
          viewBox="0 0 24 24"
          className="text-white/90"
        >
          <rect
            x="3"
            y="5"
            width="18"
            height="14"
            rx="3"
            fill="currentColor"
            opacity="0.15"
          />
          <rect
            x="6"
            y="8"
            width="12"
            height="2"
            rx="1"
            fill="currentColor"
            opacity="0.5"
          />
          <rect
            x="6"
            y="12"
            width="7"
            height="2"
            rx="1"
            fill="currentColor"
            opacity="0.5"
          />
        </svg>
      </div>
      {/* Sheet Info */}
      <div className="relative z-10 flex-1 min-w-0 flex flex-col gap-1">
        <div className="flex items-center gap-2">
          {isEditing ? (
            <input
              className="text-xl font-bold text-white truncate max-w-md group-hover:text-blue-200 transition-colors bg-zinc-900 px-2 py-1 rounded outline-none border border-blue-400"
              value={editValue}
              autoFocus
              onChange={onEditChange}
              onBlur={onEditBlur}
              onKeyDown={onEditKeyDown}
            />
          ) : (
            <>
              <div
                className="text-xl font-bold text-white truncate max-w-md group-hover:text-blue-200 transition-colors cursor-pointer"
                onClick={(e) => e.stopPropagation()}
              >
                {sheet.title || sheet.name || "Untitled Sheet"}
              </div>
              <button
                className="ml-2 p-1 rounded hover:bg-blue-100/10"
                title="Edit title"
                onClick={(e) => {
                  e.stopPropagation();
                  onEditStart();
                }}
              >
                <svg
                  width="18"
                  height="18"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="text-blue-300"
                >
                  <path
                    d="M15.232 5.232l3.536 3.536M4 20h4.586a1 1 0 0 0 .707-.293l9.414-9.414a2 2 0 0 0 0-2.828l-2.172-2.172a2 2 0 0 0-2.828 0l-9.414 9.414A1 1 0 0 0 4 20z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </>
          )}
        </div>
        <div className="text-xs text-gray-300 mt-1">
          {sheet.created_at && !isNaN(Date.parse(sheet.created_at))
            ? new Date(sheet.created_at).toLocaleString()
            : "Unknown date"}
        </div>
      </div>
      <div className="relative z-10 ml-4">
        <svg
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
          className="text-white/40 group-hover:text-blue-200 transition-colors"
        >
          <path
            d="M9 6l6 6-6 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </li>
  );
}

// Sheet list
function SheetList({
  sheets,
  onSheetClick,
  editingId,
  editValue,
  onEditStart,
  onEditChange,
  onEditBlur,
  onEditKeyDown,
}) {
  return (
    <ul className="flex flex-col gap-6">
      {sheets.map((sheet) => (
        <SheetListItem
          key={sheet.id}
          sheet={sheet}
          onClick={() => onSheetClick(sheet.id)}
          isEditing={editingId === sheet.id}
          editValue={editValue}
          onEditStart={() => onEditStart(sheet)}
          onEditChange={onEditChange}
          onEditBlur={onEditBlur}
          onEditKeyDown={onEditKeyDown}
        />
      ))}
    </ul>
  );
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [sheets, setSheets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [prevTitle, setPrevTitle] = useState("");

  useEffect(() => {
    const fetchSheets = async () => {
      try {
        const data = await syncService.fetchAllSheets();
        setSheets(data);
      } catch (err) {
        setError("Failed to load sheets");
      } finally {
        setLoading(false);
      }
    };
    fetchSheets();
  }, []);

  const handleEditStart = (sheet) => {
    setEditingId(sheet.id);
    setEditValue(sheet.title || sheet.name || "Untitled Sheet");
    setPrevTitle(sheet.title || sheet.name || "Untitled Sheet");
  };

  const handleEditChange = (e) => {
    setEditValue(e.target.value);
  };

  const handleAddSheet = async () => {
    try {
      const sheet = await syncService.api.post("/");

      setSheets((prevSheets) => [sheet, ...prevSheets]);
    } catch (error) {
      toast.error("Sheet could not be created");
    }
  };

  const handleEditBlur = async () => {
    if (editingId == null) return;

    if (editValue.trim() === prevTitle.trim()) {
      setEditingId(null);
      return;
    }

    const oldSheets = [...sheets];

    setSheets(
      sheets.map((s) => (s.id === editingId ? { ...s, title: editValue } : s))
    );

    try {
      await syncService.api.put(`/${editingId}/title`, { title: editValue });
    } catch (err) {
      setSheets(oldSheets);
      toast.error("Failed to update title");
    }
    setEditingId(null);
  };

  const handleEditKeyDown = (e) => {
    if (e.key === "Enter") {
      e.target.blur();
    } else if (e.key === "Escape") {
      setEditingId(null);
      setEditValue(prevTitle);
    }
  };

  return (
    <div className="w-full flex flex-col items-center px-4 py-10 min-h-screen bg-gradient-to-br from-[#070b0f] to-[#1e2126]">
      <ToastContainer position="top-right" autoClose={2000} />
      <div className="w-full max-w-8xl">
        <h1 className="text-3xl font-bold mb-8 text-center text-white drop-shadow-lg">
          Sheets Dashboard
        </h1>
        <AddSheet onAdd={handleAddSheet} />
        <div className="space-y-6">
          {loading && <SheetSkeleton />}
          {error && <div className="text-red-400 text-center">{error}</div>}
          {!loading && !error && sheets.length === 0 && (
            <div className="text-gray-400 text-center">No sheets found.</div>
          )}
          {!loading && !error && sheets.length > 0 && (
            <SheetList
              sheets={sheets}
              onSheetClick={(id) => navigate(`/sheet/${id}`)}
              editingId={editingId}
              editValue={editValue}
              onEditStart={handleEditStart}
              onEditChange={handleEditChange}
              onEditBlur={handleEditBlur}
              onEditKeyDown={handleEditKeyDown}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
