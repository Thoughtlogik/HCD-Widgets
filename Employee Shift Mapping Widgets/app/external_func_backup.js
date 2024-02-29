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
  function findDateInRange(arr,clientName,dateToFind, empdata,carerData,clientData,carefacilitatorData) {
    console.log("arr data:",arr);
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
        console.log("*******");
        return searchDate1 >= startDate && searchDate1 <= endDate && item.EmpName === empdata && item.care_facilitators.trim() == carefacilitatorData;
      }
    });
    return filteredItems;
  }

  function findDateInRangeclient(arr, dateToFind, empdata,clientname) {
    var spdate=moment(dateToFind).format("DD-MM-YYYY");
    var searchDate1 = new Date(dateToFind);
    const filteredItems = arr.filter(item => {
      const startDate = new Date(item.start_date);
      const endDate=new Date(item.end_date);
      const clientval=item.client.trim();
      return searchDate1 >= startDate && searchDate1 <= endDate && item.EmpName === empdata && clientval == clientname;
      // return searchDate1 >= startDate && searchDate1 <= endDate && item.EmpName === empdata;
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
    console.log("carerData:",carerData," clientData:",clientData," carefacilitatorData:",carefacilitatorData);
    $(".calendar-day").each(function () {
      var searchData = $(this).attr("data-date");
      const foundItems = findDateInRange(dataset,clientName, searchData, empnameval,carerData,clientData,carefacilitatorData);
      console.log("foundItems:",foundItems);
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
        if(maximumcount > foundItems.length)
        {
          // const shiftbtn = document.createElement('button');
          // shiftbtn.className = "empbtn";
          // shiftbtn.innerHTML = "+";
          // shiftbtn.setAttribute("carer_name",empnameval);
          // shiftbtn.setAttribute("present_date",searchData);
          // td.appendChild(shiftbtn);

          // var shiftdiv=document.createElement('div');
          // shiftdiv.className = "empdiv";
          // shiftdiv.setAttribute("present_date",searchData);
          // // shiftdiv.setAttribute("client_name",foundItems[0].client);
          // shiftdiv.setAttribute("shift_name","No Shift");
          // shiftdiv.setAttribute("carer_name",empnameval);
          // shiftdiv.innerHTML += "<br>";
          // shiftdiv.innerHTML = "No Shift";
          // td.appendChild(shiftdiv);
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
      // // $(".calendar-day").eq(indexval).append(td);
      // for (let sk = 0; sk <= emptycarer; sk++)
      // {
      //   var shiftdiv=document.createElement('div');
      //   shiftdiv.innerHTML = "No Shift1";
      //   shiftdiv.className = "empdiv";
      //   shiftdiv.setAttribute("present_date",searchData);
      //   shiftdiv.setAttribute("carer_name",empnameval);
      //   shiftdiv.innerHTML += "<br>";
      //   shiftdiv.innerHTML += ""; // Set the appropriate content here
      //   // td.appendChild(shiftdiv);
      // }
      // // $(".calendar-day").eq(indexval).append(td);

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
      // console.log("elementval:",elementval);
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


  