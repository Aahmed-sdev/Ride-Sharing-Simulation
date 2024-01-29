
function calculateDistance(point1, point2) {
    // Assuming Euclidean distance for simplicity
    return Math.sqrt(Math.pow(point1[0] - point2[0], 2) + Math.pow(point1[1] - point2[1], 2));
}
  

  /*
    In the provided JavaScript code, the threshold represents the maximum distance allowed for two points to be considered connected. This threshold value is a parameter you can adjust based on the specific requirements of your application.

    For example, if you set threshold to 2.0, it means that two points will be considered connected (an edge will be added in the adjacency list) if the Euclidean distance between them is less than 2.0 units. You should adjust this value depending on the scale of your 2D coordinates and how far apart points should be to be considered connected.
  */
  function createAdjacencyList(points, threshold) {
    const adjacencyList = {};
  
    for (let i = 0; i < points.length; i++) {
      adjacencyList[`${points[i][0]}:${points[i][1]}`] = [];
  
      for (let j = 0; j < points.length; j++) {
        if (i !== j) {
          const distance = calculateDistance(points[i], points[j]);
          // Assuming a threshold for connection, you can adjust as needed
          if (distance < threshold) {
            adjacencyList[`${points[i][0]}:${points[i][1]}`].push(`${points[j][0]}:${points[j][1]}`);
          }
        }
      }
    }
  
    return adjacencyList;
  }


  function extractCoordinates(data) {
    const coordinatesList = [];
  
    for (const point in data) {
      const [x, y] = point.split(':').map(Number);
      coordinatesList.push([ parseInt(x), parseInt(y) ]);
    }
  
    return coordinatesList;
  }
  
  //Init
  var adjacencyList = [];
  var initAdjacencyList = (data)=>{
    const coordinatesList = extractCoordinates(data);
    adjacencyList = createAdjacencyList(coordinatesList, 10)
  }
 


  // Find Shortest Path 

  /************************************** */
  function shortestPath(adjacencyList, start, end) {
    // Queue for BFS
    const queue = [start];
    // Set to keep track of visited nodes
    const visited = new Set();
    // Object to store the distance from the start node
    const distance = { [start]: 0 };
    // Parent object to store the parent of each node in the shortest path
    const parent = { [start]: null };

    // Perform BFS
    while (queue.length > 0) {
        const current = queue.shift();
        console.log('Processing.....')

        if (current === end) {
            // Reconstruct the path if the end node is reached
            return reconstructPath(parent, start, end);
        }

        for (const neighbor of adjacencyList[current]) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push(neighbor);

                // Update distance and parent
                distance[neighbor] = distance[current] + 1;
                parent[neighbor] = current;
            }
        }
    }

    // If no path is found
    return null;
}

function reconstructPath(parent, start, end) {
  const path = [];
  let current = end;
  console.log("Inside reconstruct Path.......")
  // Reconstruct the path by following the parent pointers
  while (current !== null) {
      path.unshift(current);
      current = parent[current];
      console.log("Inside while loop")
  }

  return path;
}
