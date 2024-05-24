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
      node.data = value;
      return node;
    }

    if (value < node.data) {
      this.insert(value, node.left);
    } else {
      this.insert(value, node.right);
    }
  }

  // Task 5 - Write a find(value) function that returns the node with the given value.
  find(value, node = this.root) {
    if (value == this.root.data) {
      console.log(this.root);
      return;
    }

    if (value == node.data) {
      console.log(node);
      return;
    }

    if (!node.left && !node.right) {
      console.log("No such value in the tree");
      return;
    }

    value < node.data
      ? this.find(value, node.left)
      : this.find(value, node.right);
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

const redMaple = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
redMaple.prettyPrint();
