var arrayOfHundred =[];
    for (var i = 0; i < 100; i++) {
        arrayOfHundred.push(i);
    }
    var count = 0;
    var oTable = document.createElement('table');
    var oTBody = document.createElement('tbody');
    oTable.appendChild(oTBody);
    var oRow, oCell;
    for (i = 0; i < 10; i++) {
        oRow = oTBody.insertRow(i); // 插入行
        for (var j = 0; j < 10; j++) {
            oCell = oRow.insertCell(j); //插入表格
            oCell.innerHTML = arrayOfHundred[count++];
        }
    }
    document.body.appendChild(oTable);

    function deleteRow(index) {
        var oTable = document.getElementsByTagName('table')[0];
        oTable.deleteRow(index);  //删除行
    }
