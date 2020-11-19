# robotcode

<!-- ABOUT THE PROJECT -->
## About The Project

The application is a simulation of a toy robot moving on a square table top, of dimensions 5 units x 5 units. There are no other obstructions on the table surface. The robot is free to roam around the surface of the table, but must be prevented from falling to destruction. Any movement that would result in the robot falling from the table must be prevented, however further valid movement commands must still be allowed.



### Built With

* [NodeJS v.14.15.1](https://nodejs.org/en/download/)
* [TypeScript v4.0.5](https://www.typescriptlang.org/)

<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

* NodeJS v14.15.1+: Download at: https://nodejs.org/en/download/
* NPM v6.14.8+: Should be included in NodeJS installation

### Installation

1. Clone the repo
```sh
git clone https://github.com/raytnham/robotcode
```
2. Navigate to the project root directory
3. Install NPM packages
```sh
npm install
```
4. Run the project.
```sh
npm start
```

<!-- USAGE EXAMPLES -->
## Usage

Four example command lists are provided in `root/commandListFiles` directory.

By default, the project will run with the first example command list `commandList1.txt`
```
PLACE 0,0,NORTH
MOVE
REPORT
```

Feel free to modify this file or switch to other test command lists. Open `root/src/index.ts` and change the file's name at `line 5`

