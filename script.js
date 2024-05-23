class Node {
  constructor(data, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

class Tree {
  constructor(array) {
    const cleanArray = this.cleanArray(array);
    this.root = this.buildTree(cleanArray, 0, cleanArray.length - 1);
  }

  // Removes duplicates and sorts the original array
  cleanArray(array) {
    return [...new Set(array)].sort();
  }

  // Recursively builds the tree from the sorted array
  buildTree(array, start, end) {
    if (start > end) {
      return null;
    }

    const mid = Math.floor((start + end) / 2);
    const node = new Node(array[mid]);

    node.left = this.buildTree(array, start, mid - 1);
    node.right = this.buildTree(array, mid + 1, end);

    return node;
  }

  // Taken from TOP, prints the tree nicely on the console window
  prettyPrint(node = this.root, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }
}

const redMaple = new Tree([1, 2, 3, 4, 2, 0, 9, 5, 6, 7]); // gets turned into [0, 1, 2, 3, 4, 5, 6, 7, 9], 4 is our root
redMaple.prettyPrint();
