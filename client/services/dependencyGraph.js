class Node {
  constructor() {
    // Both sets contain cell coordinates (string) eg. "A1", "B2", etc.

    this.dependencies = new Set();
    this.dependents = new Set();
  }

  addDependency(dependency) {
    this.dependencies.add(dependency);
  }

  removeDependency(dependency) {
    this.dependencies.delete(dependency);
  }

  getDependencies() {
    return Array.from(this.dependencies);
  }

  addDependent(dependent) {
    this.dependents.add(dependent);
  }

  removeDependent(dependent) {
    this.dependents.delete(dependent);
  }

  getDependents() {
    return Array.from(this.dependents);
  }

  hasDependency(dependency) {
    return this.dependencies.has(dependency);
  }

  hasDependent(dependent) {
    return this.dependents.has(dependent);
  }
}

class DependencyGraph {
  constructor() {
    this.graph = new Map();
  }

  getNode(cell) {
    if (!this.graph.has(cell)) {
      this.graph.set(cell, new Node());
    }

    return this.graph.get(cell);
  }

  // swap the cell and dependency to create vice-versa relationship
  addDependency(cell, dependency) {
    const cellNode = this.getNode(cell);
    const dependencyNode = this.getNode(dependency);

    cellNode.addDependency(dependency);
    dependencyNode.addDependent(cell);
  }

  removeDependency(cell, dependency) {
    const cellNode = this.graph.get(cell);
    const dependencyNode = this.graph.get(dependency);

    if (cellNode) {
      cellNode.removeDependency(dependency);
      this.removeEmptyNode(cell);
    }

    if (dependencyNode) {
      dependencyNode.removeDependent(cell);
      this.removeEmptyNode(dependency);
    }
  }

  removeEmptyNode(cell) {
    const node = this.graph.get(cell);
    if (
      node &&
      node.getDependencies().length === 0 &&
      node.getDependents().length === 0
    ) {
      this.graph.delete(cell);
    }
  }
}

export default DependencyGraph;
