//regex for spaces

const re = /[a-zA-Z]/;
console.log(re.test(" "));


// Creating pure data array for later filter use
var fillerData1, fillerData2, fillerData3, editedData1, editedData2, editedData3
fillerData1 = [];
fillerData2 = []; 
fillerData3 = [];
editedData1 = [];
editedData2 = [];
editedData3 = [];
  


// Adds in the values for the drop menu for the line selection when changing the value
var headerColm = ["Date", "Shift", "Intials", "Null Category #1", "Null Category #2", "Null Category #3", "Null Category #4", "Null Category #5", "Caregory %"];

var optionHeader = "";
for(var i =0; i < headerColm.length; i++){
  optionHeader += '<option value="' + headerColm[i] + '">' + headerColm[i] + "</option>"
}

document.getElementById("columnChange").innerHTML = optionHeader



// Addes in the values for the drop menu for the line selection when changing the value
var lineNum = [1, 2, 3];

var option = "";
for(var i =0; i < lineNum.length; i++){
  option += '<option value="' + lineNum[i] + '">' + lineNum[i] + "</option>"
}

document.getElementById("lineChangeValue").innerHTML = option





// Creating a table header
function makeTableHeader(){

  var table_output = "<thead id='tableHead'><tr>";
  table_output += "<th>Index</th>"
  table_output += "<th>Date</th>"
  table_output += "<th>Shift</th>"
  table_output += "<th>Intials</th>"
  table_output += "<th>Null Category #1</th>"
  table_output += "<th>Null Category #2</th>"
  table_output += "<th>Null Category #3</th>"
  table_output += "<th>Null Category #4</th>"
  table_output += "<th>Null Category #5</th>"
  table_output += "<th>Null Category %</th>"
  table_output += "</tr></thead>"

  return table_output
}

// Creating TableBody
function makeTableBody(tableData){

  var table_output = "";
  
    for(var row = 0; row < tableData.length; row++){
      table_output += "<tr>";  

      for(var colm = 0; colm <= 9; colm++){
        table_output += "<td>"+tableData[row][colm]+"</td>"
      }
      table_output += "</tr>";
    }

  return table_output
}

function cleanData(rawData, fillerData, editedData){
  // Empty out editedData, fillerData, and starting indexCount at 1
  editedData.length = 0;
  fillerData.length = 0;
  var indexCount = 1;

  for(var row = 2; row < rawData.length; row++){
      
// Make all null values in the SKU section disappear

    for(var colm = 0; colm <= 9; colm++){
      



      // Makeing Sure all Dates are filled (try method will be used in case the first row does not have selected data)
      if (colm == 1){
        if (rawData[row][colm] != null){

          try {

            selectedDate = rawData[row][colm].toLocaleDateString('en-US', {timeZone: "UTC"});
            
            rawData[row][colm] = selectedDate;
            console.log(rawData[row][colm])
          } catch (error) {
            console.log(error);

            try {
              rawData[row][colm] = selectedDate;
            } catch (error) {
              console.log(error);
            }
          }

   
        } else { 
            try {
              rawData[row][colm] = selectedDate;
          } catch (error) {
            console.log(error);
          }
        }
      };

      // Makeing Sure all Shifts are filled
      if (colm == 2){
        if (re.test(rawData[row][colm]) && rawData[row][colm] != null){

          shiftData = rawData[row][colm];
          rawData[row][colm] = shiftData;
        } else {
            try {
              rawData[row][colm] = shiftData
          } catch (error) {
            console.log(error);
          }
        }
      };

      // Making Sure intials are filled
      if (colm == 3){
        if (re.test(rawData[row][colm]) && rawData[row][colm] != null){

          intials = rawData[row][colm];
          rawData[row][colm] = intials;
        } else {
            try {
              rawData[row][colm] = intials;
          } catch (error) {
            console.log(error);
          }
        }
      };

      if (colm == 5 || colm == 6 || colm == 8 || colm == 9){
        if (rawData[row][colm] == null){

          rawData[row][colm] = "";}
      };
    };

    


     
      // Making data be sent to fillerData array, editedData array, and index
      rawData[row] = rawData[row].slice(0, 10);
      if (rawData[row][4] != null && rawData[row][7] != null){
        
      
        rawData[row][0] = indexCount++

        fillerData.push(rawData[row]);
        editedData.push(rawData[row]);
      }
  }
  }
  
// Adding Filter Function
document.getElementById("filterButton").addEventListener("click", () => {
  function filter(tableBody, fillerData, editedData){

  // Creating the varibles needed for the filters
  
    var inputYear, filterYearValue, inputMonth, filterMonthValue
  
    inputYear = document.getElementById("Year");
    filterYearValue = inputYear.value;
  
    inputMonth = document.getElementById("Month");
    filterMonthValue = inputMonth.value;
  
  
  // Creating the Filter system
    
    editedData.length = 0;
    for(var row = 0; row < fillerData.length; row++){
      
      if(new Date(fillerData[row][1]).getFullYear() == filterYearValue && filterMonthValue == ""){
        editedData.push(fillerData[row])
      };
  
      if(new Date(fillerData[row][1]).getMonth()+1 == filterMonthValue && filterYearValue == ""){
        editedData.push(fillerData[row])
      };
  
      if(new Date(fillerData[row][1]).getFullYear() == filterYearValue && filterYearValue != "" && filterMonthValue != "" && new Date(fillerData[row][1]).getMonth()+1 == filterMonthValue){
        editedData.push(fillerData[row])
      };
      if(filterYearValue == "" && filterMonthValue == ""){
        editedData.push(fillerData[row])
      };
  
     
    };
  
 
  // Recreating table with filtered
  // Make all null values in the SKU section disappear
    var table_output = ""
    for(var row = 0; row < editedData.length; row++){
      table_output += "<tr>";
      for(var colm = 0; colm <= 9; colm++){
        table_output += "<td>"+editedData[row][colm]+"</td>"
      }
      table_output += "</tr>";
  
    };
    
    document.getElementById(tableBody).innerHTML = table_output

    console.log(editedData)

  

  // // Allowing the deleteRows function to be usable after each creation of the body after filtering
  deleteRows()


  // This allows the editedData array to update
  editedData.length = 0;
  var tdData = [];

  
  row = document.getElementById(tableBody).querySelectorAll('tr td')
  
  row.forEach(row => {tdData.push(row.innerHTML)})
  while(tdData.length) editedData.push(tdData.splice(0,10))


  }

  filter("tableBody1", fillerData1, editedData1)
  filter("tableBody2", fillerData2, editedData2)
  filter("tableBody3", fillerData3, editedData3)

})
  
// The is the code that calls upon the sorting function
function sorting(tableBody, editedData, myTable){

  document.getElementById(myTable).querySelectorAll(".table-sortable th").forEach(header => {
    header.addEventListener("click", () => {
        
      var tableElement = header.parentElement.parentElement.parentElement;
      var headerIndex = Array.prototype.indexOf.call(header.parentElement.children, header);
      var isAsc = header.classList.contains("th-sort-asc");
        
      console.log(tableElement)
      sortData(tableElement, headerIndex, !isAsc, tableBody, editedData)
        
    })
  });
}

// This is the actual sorting data code
function sortData(table, column, asc = true, tableBody, editedData) {
  const tBody = document.getElementById(tableBody);
  console.log(tBody)
  var directionMod = asc ? 1 : -1;
  const rows = Array.from(tBody.querySelectorAll("tr"));
      


//Sorting the Rows

  var sortedRows = rows.sort((a, b) => {
    var aColText = a.querySelector(`td:nth-child(${column + 1})`).textContent.trim();
    var bColText = b.querySelector(`td:nth-child(${column + 1})`).textContent.trim();
  

    if (column == 0 || column == 8 || column == 9){

// Making it so that blank spaces are placed at end

      if (aColText == "") {return 1;}
      if (bColText == "") {return -1;}
      return parseFloat(aColText) > parseFloat(bColText) ? (1 * directionMod) :(-1 * directionMod)
    
    } else if (column == 4 || column == 5 || column == 6 || column == 7 ) {

// Making it so that blank spaces or non-floats are placed at top
    
      if (aColText == "" || aColText != parseFloat(aColText)) {return -1;}
      if (bColText == "" || bColText != parseFloat(bColText)) {return 1;}
      return parseFloat(aColText) > parseFloat(bColText) ? (1 * directionMod) :(-1 * directionMod)
    
  
   } else if (column == 1){

// Sorting the dates
      var dateA = new Date(aColText), dateB = new Date(bColText);
      return dateA > dateB ? (1 * directionMod) :(-1 * directionMod)

    } else {return aColText > bColText ? (1 * directionMod) :(-1 * directionMod)}          
  })


// Clear Table

  while (tBody.firstChild) {tBody.removeChild(tBody.firstChild);}

// Recreate the table with sorted data
  tBody.append(...sortedRows);

  table.querySelectorAll('th').forEach(th => th.classList.remove("th-sort-asc", "th-sort-desc"));
  table.querySelector(`th:nth-child(${column + 1})`).classList.toggle("th-sort-asc", asc);
  table.querySelector(`th:nth-child(${column + 1})`).classList.toggle("th-sort-desc", !asc);





// This is to reorder the editedData variable so that when sorting and deleting data it does not go to defalt
// This has been changed from "editedData.length = 0" from "editedData = [];" to empty the array, unsure why it was not working like it should
  editedData.length = 0;
  var tdData = [];
  row = table.querySelectorAll('tr td');
  
  row.forEach(row => {tdData.push(row.innerHTML)});
  while(tdData.length) editedData.push(tdData.splice(0,10));

  console.log(table)
  
}
  
// Function for highlighting table rows
function highlightTableRow(row) {
  // Remove highlight from previously selected row, if any
  const previouslySelectedRow = document.querySelector('tr.selected');
  
 // Highlight the clicked row
  row.classList.add('selected');

}

// function to delete table rows by selecting rows
function deleteRows(editedData, tableBody){

// highlights selected rows to delete and allowing to deselect rows
  
  const rows = document.querySelectorAll('tr');
 
  for (let i = 0; i < rows.length; i++) {
    
    rows[i].onclick = function() {
    
      if (rows[i].className == 'selected') {
        rows[i].classList.remove('selected');

      } else {highlightTableRow(this);}
    }};
 

  // Deleting all rows with the "selected" class
  document.getElementById("delRow").addEventListener("click", () => {
    
    var tableSelected = document.getElementById(tableBody);
    var selected = tableSelected.getElementsByClassName('selected');

    for (i = 0; i < selected.length; i++) {
    
      // Selecting index value
      var index = selected[i].firstChild.innerHTML;
      console.log(index)

      //  Using the index to splice out undesirable rows
      for (row = 0; row < editedData.length; row++){
        if (editedData[row][0] == index){editedData.splice(row, 1)}
      }
    }

    // View updated editedData array
    console.log(editedData)
      

    var table_output = ""
    for(var row = 0; row < editedData.length; row++){
      table_output += "<tr>";
      for(var colm = 0; colm <= 9; colm++){
        table_output += "<td>"+editedData[row][colm]+"</td>"
      }
      table_output += "</tr>";
  
    };
      
    document.getElementById(tableBody).innerHTML = table_output



// Allowing the selecting and highlighting the rows apply to the new table
    const rows = document.querySelectorAll('table tr');
    for (let i = 0; i < rows.length; i++) {
  
      rows[i].onclick = function() {
      
        if (rows[i].className == 'selected') {
          rows[i].classList.remove('selected');
  
        } else {highlightTableRow(this);}
      }
    };
  })
}

// Allows a Change in Value
document.getElementById("changeVal").addEventListener('click', () => {


  var lineNum = document.getElementById("lineChangeValue").value
  var index = document.getElementById("indexChange").value
  var newValue = document.getElementById("valueChange").value
  var chosenColm = document.getElementById("columnChange").value
  console.log(chosenColm)


  // Changes the Column name to number to parse through data



  if (chosenColm == "Date"){chosenColm = 1}
  else if (chosenColm == "Shift"){chosenColm = 2}
  else if (chosenColm == "Intials"){chosenColm = 3}
  else if (chosenColm == "Null Category #1"){chosenColm = 4}
  else if (chosenColm == "Null Category #2"){chosenColm = 5}
  else if (chosenColm == "Null Category #3"){chosenColm = 6}
  else if (chosenColm == "Null Category #4"){chosenColm = 7}
  else if (chosenColm == "Null Category #5"){chosenColm = 8}
  else if (chosenColm == "Null Category %"){chosenColm = 9}


// Allows to Decide what perameter to pick


  tableBody = "tableBody"+lineNum;
  console.log(tableBody)
  if (lineNum == 1){
    editedData = editedData1;
    fillerData = fillerData1;
  } else if (lineNum == 2){
    editedData = editedData2;
    fillerData = fillerData2;
  } else if (lineNum == 3){
      editedData = editedData3;
      fillerData = fillerData3;
    }


  tableRow = document.getElementById(tableBody).querySelectorAll('tr');
  console.log();

  // Selecting table and prompt for new value
  for (var row = 0; row < editedData.length; row++){
    for (var colm = 0; colm < 10; colm++){

      if (editedData[row][0] == index){
        editedData[row][chosenColm] = newValue;
        changeRow = tableRow[row];
        changeCell = changeRow.querySelectorAll('td');
        changeCell[chosenColm].innerHTML = newValue;
        
      }
    }
  }


  if (fillerData[index-1][0] == index){fillerData[index-1][chosenColm] = newValue}

 
  //Restablibishing the abilities to delete rows
  deleteRows(editedData, tableBody)

})

// This allows to automatticlly copy the data
function copytable() {
  var tableElement = document.getElementById('calTable')
  var body = document.body, range, sel;
  if (document.createRange && window.getSelection) {
    range = document.createRange();
    sel = window.getSelection();
    sel.removeAllRanges();
    try {
      range.selectNodeContents(tableElement);
      sel.addRange(range);
    } catch (e) {
      range.selectNode(tableElement);
      sel.addRange(range);
    }
  } else if (body.createTextRange) {
    range = body.createTextRange();
    range.moveToElementText(tableElement);
    range.select();
  }
  document.execCommand("Copy");

}

// This does the calculations and loads them onto the calTable
document.getElementById("calculateBtn").addEventListener("click", () => {

  // This calculation allows calculation of the averages and insert the averages to the table
  function calculateOverfill(editedData, resultRow){

    var overfillSum = 0;

    // This is to add all the overfill % for ave in
    for (var i = 0; i < editedData.length; i++){
      
      // Reperforming the calculations (requested), to double check the calculations are performed correctly
      var cal1 = (editedData[i][7] / editedData[i][6]) - 1;
      cal2 = cal1*100;
  
      overfillSum = overfillSum + cal2;

    }
  
    // calculation for average and round to 2 decimal
    overfillAve = overfillSum / editedData.length;
    overfillAve = overfillAve.toFixed(2);

    // Inserting the info to a table
    row = document.getElementById("calBody").querySelectorAll('tr');
    cell = row[resultRow].querySelectorAll('td');
    cell[1].innerHTML = overfillAve+"%";


    return overfillAve
  }

  // Sending the averages to the table and placing them in variables
  var overfillAve1, overfillAve2, overfillAve3
  overfillAve1 = calculateOverfill(editedData1, 0);
  overfillAve2 = calculateOverfill(editedData2, 1);
  overfillAve3 = calculateOverfill(editedData3, 2);



  //Calculating Weighted Average and placing in table
  totalCount = editedData1.length + editedData2.length + editedData3.length;
  var weightedAve = overfillAve1*(editedData1.length/totalCount) + overfillAve2*(editedData2.length/totalCount) + overfillAve3 * (editedData3.length/totalCount);
  weightedAve = weightedAve.toFixed(2)

  // Inserting the info to a table
  row = document.getElementById("calBody").querySelectorAll('tr');
  cell = row[3].querySelectorAll('td');
  cell[1].innerHTML = weightedAve+"%";
  console.log(weightedAve)

  copytable();
})

// Function to load data based on excel files
function excelFileLoad(tableName, excel_load, excel_table, myTable, tableBody, fillerData, editedData){
  // Reading in and creating the table

 

  const excel_file = document.getElementById(excel_load);
  
  excel_file.addEventListener("change", (event) => {

  
  
    var reader = new FileReader();
    reader.readAsArrayBuffer(event.target.files[0]);
  
    reader.onload = function(){
      var data = new Uint8Array(reader.result);
      var work_book = XLSX.read(data, {type: "array", cellDates: true});
      var sheet_data = XLSX.utils.sheet_to_json(work_book.Sheets['Information'], {header:1});
      const tBody = document.getElementById(tableBody);
  
      // buildTable(sheet_data)
  
      
      cleanData(sheet_data, fillerData, editedData);
      if(editedData.length > 0){
        
  // Creating the intial table      
        var table_output = ""
        table_output += '<h3>'+tableName+'</h3>';
        table_output += '<div class = "table table-striped table-bordered table-sortable table-sm "><table id= '+myTable+'>';
        table_output += makeTableHeader();
        table_output += "<tbody id= "+tableBody+">";
        table_output += makeTableBody(editedData);
        table_output += "</tbody></table></div>";
        
        // Clearing Table Body and loading



        document.getElementById(excel_table).innerHTML = table_output;
        
      }
  
      sorting(tableBody, editedData, myTable);
      deleteRows(editedData, tableBody);


  }})

}


// Making it so tables can be downloaded as excels

function exportToExcel(tableId) {
	var location = 'data:application/vnd.ms-excel;base64,';
	var excelTemplate = '<html> ' +
		'<head> ' +
		'<meta http-equiv="content-type" content="text/plain; charset=UTF-8"/> ' +
		'</head> ' +
		'<body> ' +
		document.getElementById(tableId).innerHTML +
		'</body> ' +
		'</html>'
	window.location.href = location + window.btoa(excelTemplate);
}

  // Allowing Data to be downloaded to excel file

  document.getElementById("excelDownload1").addEventListener("click", () => {
    exportToExcel("excel_table1")
  })
          
  document.getElementById("excelDownload2").addEventListener("click", () => {
    exportToExcel("excel_table2")
  })

  document.getElementById("excelDownload3").addEventListener("click", () => {
    exportToExcel("excel_table3")
  })

  


excelFileLoad("Line 1", "excel_file1", "excel_table1", "myTable1", "tableBody1", fillerData1, editedData1);
excelFileLoad("Line 2", "excel_file2", "excel_table2", "myTable2", "tableBody2", fillerData2, editedData2);
excelFileLoad("Line 3", "excel_file3", "excel_table3", "myTable3", "tableBody3", fillerData3, editedData3);




