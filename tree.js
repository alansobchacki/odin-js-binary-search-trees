// Task 1 - Build a Node class/factory.
class Node {
  constructor(data, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

// Task 2 - Build a Tree class/factory which accepts an array when initialized.
class Tree {
  constructor(array) {
    const sortedArray = this.sortedArray(array);
    this.root = this.buildTree(sortedArray, 0, sortedArray.length - 1);
  }

  // Removes duplicates and sorts the original array
  sortedArray(array) {
    return [...new Set(array)].sort((a, b) => a - b);
  }

  // Task 3 - Write a buildTree(array) function that takes an array of data and turns it into a
  // balanced binary search tree full of Node objects.
  buildTree(array, start, end) {
    if (start > end) return null;

    const mid = Math.floor((start + end) / 2);
    const node = new Node(array[mid]);

    node.left = this.buildTree(array, start, mid - 1);
    node.right = this.buildTree(array, mid + 1, end);

    return node;
  }

  // Task 4 - Write insert(value) and deleteItem(value) functions that insert/delete the given value.
  insert(value, node = this.root) {
    if (!node.left && node.right && value < node.data) {
      return (node.left = new Node(value));
    }

    if (node.left && !node.right && value > node.data) {
      return (node.right = new Node(value));
    }

    if (!node.left && !node.right) {
      if (node.data) {
        value < node.data
          ? (node.left = new Node(value))
          : (node.right = new Node(value));
        return;
      } else {
        node.data = value;
        return;
      }
    }

    value < node.data
      ? this.insert(value, node.left)
      : this.insert(value, node.right);
  }

  deleteItem(value, node = this.root, previousNode = null) {
    // Value doesn't exist in the tree
    if (!node.left && !node.right && node.data != value) {
      return false;
    }

    // Deleting a leaf
    if (!node.left && !node.right && node.data == value) {
      value < previousNode.data
        ? (previousNode.left = null)
        : (previousNode.right = null);
      return;
    }

    // Deleting a node that has only one child
    if (node.data == value) {
      if (!node.left && node.right) {
        node = node.right;
        previousNode.right.data == value
          ? (previousNode.right = node)
          : (previousNode.left = node);
        return;
      } else if (!node.right && node.left) {
        node = node.left;
        previousNode.left.data == value
          ? (previousNode.left = node)
          : (previousNode.right = node);
        return;
      }
    }

    // Deleting a node that has 2+ children
    if (node.data == value && node.right && node.left) {
      let nextBiggest = node.right;
      let previousBiggest = node.right;

      if (!nextBiggest.left) {
        node.data = nextBiggest.data;
        node.right = null;
        return;
      }

      while (nextBiggest.left) {
        nextBiggest = nextBiggest.left;
      }

      previousBiggest.left = null;
      node.data = nextBiggest.data;
      return;
    }

    value < node.data
      ? this.deleteItem(value, node.left, node)
      : this.deleteItem(value, node.right, node);
  }

  // Task 5 - Write a find(value) function that returns the node with the given value.
  find(value, node = this.root) {
    if (!node) return false;

    if (value == node.data) return node;

    if (value < node.data) {
      return this.find(value, node.left);
    } else {
      return this.find(value, node.right);
    }
  }

  // Task 6 - A function that traverse the tree in breadth-first level order
  // and provide each node as an argument to the callback.
  levelOrder(node = this.root, callback) {
    let queue = [node];
    let result = [];

    while (queue.length > 0) {
      node = queue.shift();

      callback ? callback(node) : result.push(node.data);

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    if (!callback) return result;
  }

  // Task 7 - Write inOrder(callback), preOrder(callback), and postOrder(callback)
  // functions that also accept an optional callback as a parameter.
  inOrder(root = this.root, callback) {
    let result = [];

    function inOrderTraverse(node) {
      if (!node) return;

      inOrderTraverse(node.left);
      callback ? callback(node) : result.push(node.data);
      inOrderTraverse(node.right);
    }

    inOrderTraverse(root);
    return result;
  }

  preOrder(root = this.root, callback) {
    let result = [];

    function preOrderTraverse(node) {
      if (!node) return;

      callback ? callback(node) : result.push(node.data);
      preOrderTraverse(node.left);
      preOrderTraverse(node.right);
    }

    preOrderTraverse(root);
    return result;
  }

  postOrder(root = this.root, callback) {
    let result = [];

    function postOrderTraverse(node) {
      if (!node) return;

      postOrderTraverse(node.left);
      postOrderTraverse(node.right);
      callback ? callback(node) : result.push(node.data);
    }

    postOrderTraverse(root);
    return result;
  }

  // Task 8 - Write a height(node) function that returns the given node’s height.
  height(node) {
    let height = -1;

    if (!this.root) return height;
    if (!this.find(node)) return false;

    let currentNode = this.find(node);
    let queue = [currentNode];

    while (queue.length > 0) {
      let levelSize = queue.length;

      for (let i = 0; i < levelSize; i++) {
        let node = queue.shift();

        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
      }

      height++;
    }

    return height;
  }

  // Task 9 - Write a depth(node) function that returns the given node’s depth.
  depth(node) {
    if (!this.root) return -1;
    if (!this.find(node)) return false;

    let currentNode = this.find(node);
    let queue = [this.root];
    let depth = 0;

    if (currentNode === this.root) return depth;

    while (queue.length > 0) {
      let levelSize = queue.length;

      for (let i = 0; i < levelSize; i++) {
        let node = queue.shift();

        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
        if (node.right == currentNode || node.left == currentNode) {
          return depth + 1;
        }
      }

      depth++;
    }

    return depth;
  }

  // Helper function for isBalanced
  getSubTreeHeight(node) {
    if (node === null) return 0;

    const leftHeight = this.getSubTreeHeight(node.left);
    const rightHeight = this.getSubTreeHeight(node.right);
    return Math.max(leftHeight, rightHeight) + 1;
  }

  // Task 10 - Write an isBalanced function that checks if the tree is balanced.
  isBalanced() {
    if (!this.root) return true;

    const leftHeight = this.getSubTreeHeight(this.root.left);
    const rightHeight = this.getSubTreeHeight(this.root.right);
    const heightDifference = Math.abs(leftHeight - rightHeight);

    return heightDifference > 1 ? false : true;
  }

  // Task 11 - Write a rebalance function that rebalances an unbalanced tree.
  rebalance() {
    if (!this.root) return false;

    const sortedArray = this.inOrder();
    this.root = this.buildTree(sortedArray, 0, sortedArray.length - 1);
  }

  // Taken from TOP, prints the tree on the console window
  prettyPrint(node = this.root, prefix = "", isLeft = true) {
    if (node === null) return;

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

// Final Task - Write a driver script that does the following:
// Create a binary search tree from an array of random numbers < 100.
// Confirm that the tree is balanced by calling isBalanced.
// Print out all elements in level, pre, post, and in order.
// Unbalance the tree by adding several numbers > 100.
// Confirm that the tree is unbalanced by calling isBalanced.
// Balance the tree by calling rebalance.
// Confirm that the tree is balanced by calling isBalanced.
// Print out all elements in level, pre, post, and in order.

// Helper functions for driver
function randomArray(min, max) {
  let newArray = [];

  while (newArray.length < 13) {
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    newArray.push(randomNumber);
  }

  return newArray;
}

function display(tree) {
  console.log("Here's our current Balanced Binary Search Tree:");
  tree.prettyPrint();
}

function printElements(tree) {
  console.log("Printing out all elements in level, pre, post, and in order");
  console.log(tree.levelOrder());
  console.log(tree.preOrder());
  console.log(tree.postOrder());
  console.log(tree.inOrder());
}

function unbalance(tree) {
  for (let i = 0; i < 6; i += 1) {
    const randomNumber = Math.floor(Math.random() * (999 - 101 + 1)) + 101;
    tree.insert(randomNumber);
  }

  console.log("Unbalancing tree...");
}

function checkBalance(tree) {
  tree.isBalanced()
    ? console.log("The tree is balanced")
    : console.log("The tree isn't balanced");
}

function rebalance(tree) {
  console.log("Rebalancing tree...");
  tree.rebalance();
}

//

function driver() {
  const tree = new Tree(randomArray(1, 99));

  display(tree);
  checkBalance(tree);
  printElements(tree);
  unbalance(tree);
  display(tree);
  checkBalance(tree);
  rebalance(tree);
  display(tree);
  checkBalance(tree);
  printElements(tree);
}

driver();
