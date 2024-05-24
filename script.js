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
    if (start > end) {
      return null;
    }

    const mid = Math.floor((start + end) / 2);
    const node = new Node(array[mid]);

    node.left = this.buildTree(array, start, mid - 1);
    node.right = this.buildTree(array, mid + 1, end);

    return node;
  }

  // Task 4 - Write insert(value) and deleteItem(value) functions that insert/delete the given value.
  insert(value, node = this.root) {
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
      console.log("No such value in the tree.");
      return;
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
    if (value == node.data) {
      console.log(node);
      return;
    }

    if (!node.left && !node.right) {
      console.log("No such value in the tree.");
      return;
    }

    value < node.data
      ? this.find(value, node.left)
      : this.find(value, node.right);
  }

  // Task 6 - Write a levelOrder(callback) function that accepts an optional callback function as its parameter.
  levelOrder(callback) {
    //
  }

  // Taken from TOP, prints the tree on the console window
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

const redMaple = new Tree([20, 30, 40, 32, 34, 36, 50, 70, 60, 65, 80, 75, 85]);
redMaple.prettyPrint();
redMaple.deleteItem(32);
redMaple.prettyPrint();
