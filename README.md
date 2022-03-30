# TUTORIAL

This is the tool for upload system icon using api add-system.

## Required Environment

```bash
NodeJs: v14.15.4 or latest

NPM: 6.14.10 or latest
```


## Installation

```bash
npm install
```

## Usage for Excel file

1. Copy all file svg icon and paste to folder "./icons"

2. Open excel file dataImport.xlsx 
    - Add data follow format of excel
      ```javascript
      // --------------------------------------
      // | FILENAME    | CATEGORY |    TAGS   |
      // --------------------------------------
      // | example.svg |  10      |   example |
      // --------------------------------------
      ```
      FILENAME: is file name of icons in the ```icons``` folder.</br>
      CATEGORY: is category of icon with value includes ```[0,1,2,3,4]```.</br>
      TAGS: is a string use to search.</br></br>

3. Check data to exactly for finalize.

4. Run 
  ```bash
  npm start-excel
  ```

## Usage for file

  - <font color="red"> JUST ONLY USE WHEN FILE NAME IS EXACTLY FORMAT FOLLOW THE RULE: </br>
    Need to separate each icon is 1 svg file.</br>
    File name need to have rule for name:</br>

    {catefory}_{tags}.svg

    Category value is:
      app: 0,
      user: 1,
      settings: 2,
      goalsChalleges: 3,
      nutritionSleep: 4

    tags: is name of icon will be use to search

    Example: we have an icon with category is APP and tags is “red-dogs”, So name of icon will be: 0_red-dog.svg
  </font>

1. Copy all file svg icon and paste to folder "./icons"

2. Run 
  ```bash
  npm start
  ```

## License
<i><b>[MILKTEA]<b><i>