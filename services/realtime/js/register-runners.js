   
var teamName = [];
function addRecord() {
    var inp = document.getElementById('inputtext');
    teamName.push(inp.value);
    inp.value = "";  
    }
    
    function displayRecord() {
    document.getElementById("values").innerHTML = teamName.join(", ");
    }
         
   
   var arrHead = new Array();
    arrHead = ['', 'Participant Full Name', 'Category', 'Team Name', 'BIB Number', 'CP1', 'CP2', 'CP3', 'CP4', 'CP5' , 'CP6', 'CP7', 'CP8', 
    'CP9', 'CP10', 'CP11', 'CP12', 'CP13', 'CP14', 'CP15', 'CP16', 'CP17', 'CP18', 'Finish', 'Tracker ID Number', 'Tracker Phone Nr/Tracker IP', 'Participant Phone Number', 'Emergency Person Phone Number', 'Country Name', 'Club Name'];

    var runnersCategory = new Array();
    runnersCategory = ['Male', 'Female', 'Teams (male)', 'Teams (female)', 'Teams (mix)']

    teamName = ['Individual']


    function createTable() {
        var empTable = document.createElement('table');
        empTable.setAttribute('id', 'empTable'); 

        var tr = empTable.insertRow(-1);
        for (var h = 0; h < arrHead.length; h++) {
            var th = document.createElement('th'); 
            th.innerHTML = arrHead[h];
            tr.appendChild(th);
        }
        

        var div = document.getElementById('cont');
        div.appendChild(empTable);  
    }


    function generateTableHead(table) {
        let thead = table.createTHead();
      }
      
      let table = document.querySelector("table");
      generateTableHead(table);
      function generateTableHead(table) {
        let thead = table.createTHead();
        let row = thead.insertRow();
      }
    
    function addRow() {
        var empTab = document.getElementById('empTable');

        var rowCnt = empTab.rows.length;   
        var tr = empTab.insertRow(rowCnt); 
        tr = empTab.insertRow(rowCnt);

        for (var c = 0; c < arrHead.length; c++) {
            var td = document.createElement('td'); 
            td = tr.insertCell(c);

            if (c == 0) {      
                var button = document.createElement('input');
                button.setAttribute('type', 'button');
                button.setAttribute('value', 'Remove');

                button.setAttribute('onclick', 'removeRow(this)');

                td.appendChild(button);
            }
            else if (c == 2) {      
                var selectList = document.createElement('select');
                selectList.setAttribute('type', 'select');
                for(var i = 0; i < runnersCategory.length; i++) {
                    var opt = runnersCategory[i];
                    var el = document.createElement("option");
                    el.textContent = opt;
                    el.value = opt;
                    selectList.appendChild(el);
                    td.appendChild(selectList);
                }
            }
            else if (c == 3) {      
                var selectList = document.createElement('select');
                selectList.setAttribute('type', 'select');
                for(var i = 0; i < teamName.length; i++) {
                    var opt = teamName[i];
                    var el = document.createElement("option");
                    el.textContent = opt;
                    el.value = opt;
                    selectList.appendChild(el);
                    td.appendChild(selectList);
                }
            }
            else {
                var ele = document.createElement('input');
                ele.setAttribute('type', 'text');
                ele.setAttribute('value', '');

                td.appendChild(ele);
            }

        }
    }
   


    function removeRow(oButton) {
        var empTab = document.getElementById('empTable');
        empTab.deleteRow(oButton.parentNode.parentNode.rowIndex); 
    }

    function submit() {
        var myTab = document.getElementById('empTable');
        var arrValues = new Array();
        for (row = 1; row < myTab.rows.length - 1; row++) {
            for (c = 0; c < myTab.rows[row].cells.length; c++) {  
                var element = myTab.rows.item(row).cells[c];
                if ((element.childNodes[0].getAttribute('type') == 'text') || (element.childNodes[0].getAttribute('type') == 'select')) {
                    arrValues.push("'" + element.childNodes[0].value + "'");
                }
            }
        }
        
        //document.getElementById('output').innerHTML = arrValues;
        //console.log (arrValues);   
    }






    