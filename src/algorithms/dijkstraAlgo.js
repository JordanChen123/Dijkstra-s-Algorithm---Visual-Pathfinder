export function dijkstra(grid, startNode, finishNode) {
 
  const NodesVisitInOrder = [];
  const unvisitedNodes = new Set(getAllNodes(grid));
  
  startNode.distance = 0;

  while (unvisitedNodes.size) {
    
    let closestNode = null;
    let closestNodeDistance = Infinity;

    for (const node of unvisitedNodes) {
     
      if (node.distance < closestNodeDistance) {
        closestNode = node;
        closestNodeDistance = node.distance;
      }
    
    }

    // If the closest node is at a distance of infinity, we should stop as we must be trapped.
    if (closestNodeDistance === Infinity) return NodesVisitInOrder;

    closestNode.isVisited = true;
    NodesVisitInOrder.push(closestNode);

    if (closestNode === finishNode) return NodesVisitInOrder;

    unvisitedNodes.delete(closestNode);
    updateUnvisitedNeighbors(closestNode, grid);
  }

}

function updateUnvisitedNeighbors(node, grid) {
  
  const { col, row } = node;
  const neighbors = [
  
    { x: row - 1, y: col },
    { x: row + 1, y: col },
    { x: row, y: col - 1 },
    { x: row, y: col + 1 },
  
  ];

  for (const neighbor of neighbors) {
    const { x, y } = neighbor;

    if (x >= 0 && x < grid.length && y >= 0 && y < grid[0].length) {
      const neighborNode = grid[x][y];

      if (!neighborNode.isVisited && !neighborNode.isWall) {
        const newDistance = node.distance + 1;

        if (newDistance < neighborNode.distance) {
          neighborNode.distance = newDistance;
          neighborNode.previousNode = node;
        }
      }
    }
  }
}

function getAllNodes(grid) {
  const nodes = [];
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
}

// Find the shortest path by backtracking from the finish node.
// Only works when called after the dijkstra method above.
export function getNodesInShortestPathOrder(finishNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;

  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }

  return nodesInShortestPathOrder;
}
