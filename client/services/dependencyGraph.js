class DependencyGraphInterface {
  addDependency(cell, dependency) {
    throw new Error("Method not implemented.");
  }

  removeDependency(cell, dependency) {
    throw new Error("Method not implemented.");
  }

  getDependencies(cell) {
    throw new Error("Method not implemented.");
  }

  getDependents(cell) {
    throw new Error("Method not implemented.");
  }

  hasDependency(cell, dependency) {
    throw new Error("Method not implemented.");
  }

  hasDependent(cell, dependent) {
    throw new Error("Method not implemented.");
  }
}

class DependencyGraph extends DependencyGraphInterface {
  /**
   * DependencyGraph is a directed graph where each cell can have multiple dependencies and dependents.
   * The graph is represented as a map where the key is the cell and the value is an object containing
   * two sets: one for dependencies and one for dependents.
   */
  constructor() {
    // Map from cell => { dependencies: Set, dependents: Set }
    super();
    this.graph = new Map();
  }

  getNode(cell) {
    if (!this.graph.has(cell)) {
      this.graph.set(cell, { dependencies: new Set(), dependents: new Set() });
    }

    return this.graph.get(cell);
  }

  addDependency(cell, dependency) {
    const cellNode = this.getNode(cell);
    const dependencyNode = this.getNode(dependency);

    cellNode.dependencies.add(dependency);
    dependencyNode.dependents.add(cell);
  }

  removeDependency(cell, dependency) {
    const cellNode = this.graph.get(cell);
    const dependencyNode = this.graph.get(dependency);

    if (cellNode) {
      cellNode.dependencies.delete(dependency);

      this.removeEmptyNode(cell);
    }

    if (dependencyNode) {
      dependencyNode.dependents.delete(cell);

      this.removeEmptyNode(dependency);
    }
  }

  getDependencies(cell) {
    const node = this.graph.get(cell);

    return node ? Array.from(node.dependencies) : [];
  }

  getDependents(cell) {
    const node = this.graph.get(cell);

    return node ? Array.from(node.dependents) : [];
  }

  hasDependency(cell, dependency) {
    const node = this.graph.get(cell);

    return node ? node.dependencies.has(dependency) : false;
  }

  hasDependent(cell, dependent) {
    const node = this.graph.get(cell);

    return node ? node.dependents.has(dependent) : false;
  }

  removeEmptyNode(cell) {
    const node = this.graph.get(cell);

    if (node && node.dependencies.size === 0 && node.dependents.size === 0) {
      this.graph.delete(cell);
    }
  }
}

export default DependencyGraph;
