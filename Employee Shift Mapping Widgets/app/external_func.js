  // Select2 Function part
  $("#multiplecarer").select2({
    placeholder: "Select Carer",
    allowClear: true,
    closeOnSelect: false
  });
  $("#multiplecli").select2({
    placeholder: "Select Client",
    allowClear: true,
    closeOnSelect: false
  });
  $("#multiplecarefaci").select2({
    placeholder: "Care Facilitier",
    allowClear: true
  });
  // Select2 Function part ends
  // date check script on popup save button event
  function dateCheck(from,to,check) {
    var fDate,lDate,cDate;
    fDate = Date.parse(from);
    lDate = Date.parse(to);
    cDate = Date.parse(check);

    if((cDate <= lDate && cDate >= fDate)) {
      return true;
    }
    return false;
  }
  // date check script on popup save button event ends
  // Function to group items by carerName
  function groupByCarerName(data) {
    var groupedArrays = {};

    data.forEach(function(item) {
        var carerName = item.carerName;

        if (!groupedArrays[carerName]) {
            // If the array for the carerName does not exist, create a new one
            groupedArrays[carerName] = [];
        }

        // Push the item into the corresponding array
        groupedArrays[carerName].push(item);
    });

    return groupedArrays;
  }

  // Get Combined array as for the filter
  function generateCombinations(...arrays) {
    const combinations = [];
    function generate(currentCombination, index) {
      if (index === arrays.length) {
        combinations.push(`{${currentCombination.join(', ')}}`);
        return;
      }

      if (arrays[index].length === 0) {
        generate(currentCombination, index + 1);
      } else {
        for (const obj of arrays[index]) {
          const key = Object.keys(obj)[0];
          const value = obj[key];
          generate([...currentCombination, `"${key}": "${value}"`], index + 1);
        }
      }
    }
    generate([], 0);
    return combinations;
  }

  // Get Combined array as for the filter ends
  // check hasOwnProperty
  function checkProperties(obj, properties) {
    for (var i = 0; i < properties.length; i++) {
      if (!obj.hasOwnProperty(properties[i])) {
        return false;
      }
    }
    return true;
  }
  // check hasOwnProperty ends

  // Create New Array with unique value
  function filterObjectsByCarerName(arr, arr1) {
    return arr1.filter(function(obj) {
      return !arr.some(function(obj2) {
        return obj2.carerName === obj.carerName;
      });
    });
  }
  // Create New Array with unique value ends here

  function removeDuplicatesByKey(array, key) {
    const uniqueKeys = new Set();
    return array.filter(item => {
      const keyValue = item[key];
      if (!uniqueKeys.has(keyValue)) {
        uniqueKeys.add(keyValue);
        return true;
      }
      return false;
    });
  }

  // ***** Function to find dates within a range for a specific employee *****
  // ***** Function to find dates within a range for a specific employee *****
  function findDateInRangesp(arr,clientName,dateToFind, empdata,carerData,clientData,carefacilitatorData) {
    var spdate=moment(dateToFind).format("DD-MM-YYYY");
    console.log("arr:",arr);
    var searchDate1 = new Date(dateToFind);
    const filteredItems = arr.filter(item => {
      const startDate = new Date(item.start_date);
      const endDate=new Date(item.end_date);
      const clientval=item.client.trim();
      if (carerData !=0 && clientData !=0)
      {
        return searchDate1 >= startDate && searchDate1 <= endDate && item.EmpName === empdata && clientval == clientName;
      }
      else if (carerData !=0) {
        return searchDate1 >= startDate && searchDate1 <= endDate && item.EmpName === empdata;
      }
      else if (clientData !=0)
      {
        return searchDate1 >= startDate && searchDate1 <= endDate && item.EmpName === empdata && clientval == clientName;
      }
      else if (carefacilitatorData !=0)
      {
        console.log("*************************");
        return searchDate1 >= startDate && searchDate1 <= endDate && item.EmpName === empdata && item.care_facilitators.trim() == carefacilitatorData && clientval == clientName;
      }
    });
    return filteredItems;
  }

  function findDateInRange(arr,clientName,dateToFind, empdata,carerData,clientData,carefacilitatorData) {
    var spdate=moment(dateToFind).format("DD-MM-YYYY");
    var searchDate1 = new Date(dateToFind);
    const filteredItems = arr.filter(item => {
      const startDate = new Date(item.start_date);
      const endDate=new Date(item.end_date);
      const clientval=item.client.trim();
      if (carerData ==0 && clientData ==0 && carefacilitatorData ==0)
      {
        return searchDate1 >= startDate && searchDate1 <= endDate && item.EmpName === empdata;
      }
      else if (carerData !=0 && clientData !=0)
      {
        return searchDate1 >= startDate && searchDate1 <= endDate && item.EmpName === empdata && clientval == clientName;
      }
      else if (carerData !=0)
      {
        return searchDate1 >= startDate && searchDate1 <= endDate && item.EmpName === empdata;
      }
      else if (clientData !=0)
      {
        return searchDate1 >= startDate && searchDate1 <= endDate && item.EmpName === empdata && clientval == clientName;
      }
      else if (carefacilitatorData !=0)
      {
        return searchDate1 >= startDate && searchDate1 <= endDate && item.EmpName === empdata && item.care_facilitators.trim() == carefacilitatorData;
      }
    });
    return filteredItems;
  }
  // findDateInRangeDelete part
  function findDateInRangeDelete(arr,dateToFind,empdata,shiftName) {
    var spdate=moment(dateToFind).format("DD-MM-YYYY");
    var searchDate1 = new Date(dateToFind);
    const filteredItems = arr.filter(item => {
      const startDate = new Date(item.start_date);
      const endDate=new Date(item.end_date);
      const clientval=item.client.trim();
      return searchDate1 >= startDate && searchDate1 <= endDate && item.EmpName === empdata && item.shift ==shiftName;
    });
    return filteredItems;
  }
  // ***** Function to find dates within a range for a specific employee ends here *****

  // ***** Find and Remove Duplicate from emparr list *****
  function removeDuplicates(arr, keyProperties) {
    var uniquePairs = new Set();
    var result = [];
    for (var i = 0; i < arr.length; i++) {
      var obj = arr[i];
      var key = keyProperties.map(prop => obj[prop]).join('-');
      if (!uniquePairs.has(key)) {
        uniquePairs.add(key);
        result.push(obj);
      }
    }
    return result;
  }
  // ***** Find and Remove Duplicate from emparr list ends *****

  // *******************************************************************
  // Shift Assign part starts here

  // ***** Assign shift data to UI Which has shift data *****
  async function PostShiftFun(dataset,empnameval,clientName,carefaciName,carerData,clientData,carefacilitatorData){
    var indexval=0;
    $(".calendar-day").each(function () {
      var searchData = $(this).attr("data-date");
      const foundItems = findDateInRange(dataset,clientName, searchData, empnameval,carerData,clientData,carefacilitatorData);
      const td = document.createElement('tr');
      td.className = "EMP_tr1";
      if (foundItems.length > 0)
      {
        for (let sp = 0; sp < foundItems.length; sp++)
        {
          const shiftdiv=document.createElement('div');
          shiftdiv.className = "empdiv";
          shiftdiv.innerHTML = foundItems[sp].shift;
          shiftdiv.setAttribute("carer_name",empnameval);
          shiftdiv.setAttribute("present_date",searchData);
          shiftdiv.setAttribute("shift_name",foundItems[sp].shift);
          shiftdiv.setAttribute("client_name",foundItems[sp].client);
          shiftdiv.setAttribute("start_date",foundItems[sp].start_date);
          shiftdiv.setAttribute("end_date",foundItems[sp].end_date);
          shiftdiv.setAttribute("sub_ID",foundItems[sp].sub_ID);
          shiftdiv.setAttribute("recid",foundItems[sp].rec_id);
          // td.innerHTML = foundItems[0].shift; // Set the appropriate content here
          // td.appendChild(shiftbtn);
          td.appendChild(shiftdiv);
        }
        const shiftbtn = document.createElement('button');
        shiftbtn.className = "empbtn";
        shiftbtn.innerHTML = "+";
        shiftbtn.setAttribute("carer_name",empnameval);
        shiftbtn.setAttribute("present_date",searchData);
        td.appendChild(shiftbtn);
        $(".calendar-day").eq(indexval).append(td);
      }
      else
      { 
        var shiftdiv=document.createElement('div');
        shiftdiv.innerHTML = "No Shift";
        shiftdiv.className = "empdiv";
        shiftdiv.setAttribute("present_date",searchData);
        shiftdiv.setAttribute("carer_name",empnameval);
        shiftdiv.innerHTML += "<br>";
        shiftdiv.innerHTML += ""; // Set the appropriate content here
        td.appendChild(shiftdiv);
        if (maximumcount>2)
        {
          for (let sp = 0; sp < (maximumcount-1); sp++)
          {
            var shiftdiv=document.createElement('div');
            shiftdiv.innerHTML = "No Shift";
            shiftdiv.className = "empdiv";
            shiftdiv.setAttribute("present_date",searchData);
            shiftdiv.setAttribute("carer_name",empnameval);
            shiftdiv.innerHTML += "<br>";
            shiftdiv.innerHTML += ""; // Set the appropriate content here
            td.appendChild(shiftdiv);
          }
        }
        const shiftbtn = document.createElement('button');
        shiftbtn.className = "empbtn";
        shiftbtn.innerHTML = "+";
        shiftbtn.setAttribute("carer_name",empnameval);
        shiftbtn.setAttribute("present_date",searchData);
        td.appendChild(shiftbtn);
        $(".calendar-day").eq(indexval).append(td);
      }
      indexval++;
    });
  }
  // ***** Assign shift data to UI Which has shift data ends *****
  // ***** Assign shift data to UI Which has no shift data starts *****
  async function PostEmptyShiftFunc(empnameval){
    var indexval=0;
    $(".calendar-day").each(function () {
      var searchData = $(this).attr("data-date");
      const td = document.createElement('tr');
      td.className = "EMP_tr1";
      const shiftbtn = document.createElement('button');
      shiftbtn.className = "empbtn";
      shiftbtn.innerHTML = "+";
      shiftbtn.setAttribute("carer_name",empnameval);
      shiftbtn.setAttribute("present_date",searchData);
      td.appendChild(shiftbtn);
      $(".calendar-day").eq(indexval).append(td);
      indexval++;
    });
  }
  // ***** Assign shift data to UI Which has no shift data ends *****
  // *********************************************************************
  async function CarerFilterFunc(carerData,clientData){
    var EMPArr=[];
    Employee_Shift_List.forEach(elementval =>{
      const empName = elementval.EmpName.trim();
      const clientName = elementval.client.trim();
      var care_facilitators=elementval.care_facilitators.trim();
      var tempemp=[];
      tempemp["carerName"]=empName;
      tempemp["clientName"]=clientName;
      tempemp["care_facilitator"]=care_facilitators;
      EMPArr.push(tempemp);
    });
    return EMPArr;
  }

  // Filter Shift data based on client data
  function myFunction() {
    var ClientID = document.getElementById("dropdownname_cl_popup").value;
    $("#dropdownname_sht").find("option").remove();
    ZOHO.CREATOR.API.getAllRecords({reportName : "Shift_Report1",criteria : '(Client == "'+ClientID+'")',page : 1}).then(function(shift_rep){
      var record_arr = shift_rep.data;
      for(var index in record_arr){
        // console.log(record_arr)[index];
        var cli = record_arr[index].Clients.display_value;
        var temp_5 = '<option id="dropdownname_sht" shift_rec_id="'+ record_arr[index].ID +'" shift_name="'+record_arr[index].Shift_Name+'">'+record_arr[index].Shift_Name+'</option>';
        $('#dropdownname_sht').append(temp_5)
           
      }  
    });
  }
  // Filter Shift data based on client data ends here







  // ***** Assign shift data to UI Which has shift data *****
  async function PostShiftFunsp(dataset,Empelement,result){
    var indexval=0;
    $(".calendar-day").each(function () {
      var searchData = $(this).attr("data-date");
      const td = document.createElement('tr');
      td.className = "EMP_tr1";
      console.log("result[Empelement]",result[Empelement].length);
      const resultcount=result[Empelement].length;
      var Resparr=[];
      var RespCount=0;
      result[Empelement].forEach(function(item) {
        // Access properties of the current item
        var carerName=item.carerName;
        var clientName=item.clientName;
        var carefaciName=item.care_facilitator;
        var carerData=item.carerData;
        var clientData=item.clientData;
        var carefaciData=item.carefaciData;

        const foundItems = findDateInRangesp(dataset,clientName, searchData, carerName,carerData,clientData,carefaciData);
        console.log("foundItemssp:",foundItems);
        if (foundItems.length > 0)
        {
          Resparr.push(1);
          for (let sp = 0; sp < foundItems.length; sp++)
          {
            const shiftdiv=document.createElement('div');
            shiftdiv.className = "empdiv";
            shiftdiv.innerHTML = foundItems[sp].shift;
            shiftdiv.setAttribute("carer_name",carerName);
            shiftdiv.setAttribute("present_date",searchData);
            shiftdiv.setAttribute("shift_name",foundItems[sp].shift);
            shiftdiv.setAttribute("client_name",foundItems[sp].client);
            shiftdiv.setAttribute("start_date",foundItems[sp].start_date);
            shiftdiv.setAttribute("end_date",foundItems[sp].end_date);
            shiftdiv.setAttribute("sub_ID",foundItems[sp].sub_ID);
            shiftdiv.setAttribute("recid",foundItems[sp].rec_id);
            td.appendChild(shiftdiv);
          }
          const shiftbtn = document.createElement('button');
          shiftbtn.className = "empbtn";
          shiftbtn.innerHTML = "+";
          shiftbtn.setAttribute("carer_name",carerName);
          shiftbtn.setAttribute("present_date",searchData);
          td.appendChild(shiftbtn);
        }
        else
        { 
          Resparr.push(0);
        }
        RespCount++
        if (RespCount == resultcount)
        {
          console.log("Resparr:",Resparr);
          var oneExists = Resparr.includes(1);
          if (oneExists==false)
          {
            var shiftdiv=document.createElement('div');
            shiftdiv.innerHTML = "No Shift";
            shiftdiv.className = "empdiv";
            shiftdiv.setAttribute("present_date",searchData);
            shiftdiv.setAttribute("carer_name",carerName);
            shiftdiv.innerHTML += "<br>";
            shiftdiv.innerHTML += ""; // Set the appropriate content here
            td.appendChild(shiftdiv);
            if (maximumcount>2)
            {
              for (let sp = 0; sp < (maximumcount-1); sp++)
              {
                var shiftdiv=document.createElement('div');
                shiftdiv.innerHTML = "No Shift";
                shiftdiv.className = "empdiv";
                shiftdiv.setAttribute("present_date",searchData);
                shiftdiv.setAttribute("carer_name",carerName);
                shiftdiv.innerHTML += "<br>";
                shiftdiv.innerHTML += ""; // Set the appropriate content here
                td.appendChild(shiftdiv);
              }
            }
            const shiftbtn = document.createElement('button');
            shiftbtn.className = "empbtn";
            shiftbtn.innerHTML = "+";
            shiftbtn.setAttribute("carer_name",carerName);
            shiftbtn.setAttribute("present_date",searchData);
            td.appendChild(shiftbtn);
          }
        }
      });
      $(".calendar-day").eq(indexval).append(td);
      indexval++;
    });




      
  }
  // ***** Assign shift data to UI Which has shift data ends *****
