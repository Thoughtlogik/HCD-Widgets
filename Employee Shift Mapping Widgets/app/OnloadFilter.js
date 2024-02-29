  function Onloadfilter(ClientN,shiftN,Carerval){
  
  
      console.log( Carerval);
  
  ///// shift filter
  
      ZOHO.CREATOR.init()
      .then(function(data) {
          $("#dropdownname_sht").val(shiftN);
  
          $("#dropdownname_sht").find("option").remove();
          // console.log("Testing");
          var ClientID = ClientN;
          var config = {
              appName : "hcd-admin",
              reportName : "Shift_Report1",
              criteria : '(Client == "'+ClientID+'")',
              page : 1
          }
          // console.log(config);
          ZOHO.CREATOR.API.getAllRecords(config).then(function(shift_rep){
              var record_arr = shift_rep.data;
              for(var index in record_arr){
                  // console.log(record_arr)[index];
                  var cli = record_arr[index].Clients.display_value;
                  var shift3 = record_arr[index].Shift_Name;
                  // console.log("client:  "+shift3);
                  if (shiftN != shift3){
                  // console.log("effgiu",record_arr[index]);
                  // console.log(recordArr[index].Name.display_value);
                  // // var var1 = document.createElement("option");
                  // // var1.setAttribute("customer_name",recordArr[index].CUSTOMER_ID.display_value);
                      var temp_5 = '<option id="dropdownname_sht" shift_rec_id="'+ record_arr[index].ID +'" shift_name="'+record_arr[index].Shift_Name+'">'+record_arr[index].Shift_Name+'</option>';
                  // $('#dropdownname_sht').append(temp_5)
                  }
                  else
                  {
                      var temp_9 = '<option id="dropdownname_sht" shift_rec_id="'+ record_arr[index].ID +'" shift_name="'+record_arr[index].Shift_Name+'">'+record_arr[index].Shift_Name+'</option>';
                  }
              
              }  
              $('#dropdownname_sht').append(temp_9)
              $('#dropdownname_sht').append(temp_5)
          });
      
  
      ///carer filter
          $("#dropdownname_cr_popup").find("option").remove();
          // let ActiveCarer = "true";
          var CarerID = Carerval;
          var config = {
              appName : "hcd-admin",
              reportName : "Carers_Report",
              page : 1
          }
          // console.log(config);
          ZOHO.CREATOR.API.getAllRecords(config).then(function(response){
              var recordArr = response.data;
              // console.log(recordArr);
  
              for(var index in recordArr){
                  Care2 = recordArr[index].Name.display_value.trim();
                  CarerID1 =recordArr[index].ID;
                  // console.log(Care2);
                  // console.log(CarerID1);
                  // console.log(recordArr[index].Carers.display_value);
              if (Carerval != Care2)
              {
                  var temp_8 = '<option id="dropdownname_cr_popup" cr_rec_id="'+recordArr[index].ID+'" carer_name="'+recordArr[index].Name.display_value+'">'+recordArr[index].Name.display_value+'</option>';
              
              }
              else
              {
              
                  var temp_11 = '<option id="dropdownname_cr_popup"  cr_rec_id="'+recordArr[index].ID+'" carer_name="'+recordArr[index].Name.display_value+'">'+recordArr[index].Name.display_value+'</option>';
              
              }
          
          }
          
          $('#dropdownname_cr_popup').append(temp_11);
          });
          // $(".flt_btn1").click(function(){
          //     location.reload()
          // })
          $("#dropdownname_cl_popup").find("option").remove();
          // $("##dropdownname_cl_popup").find('option').not(':first').remove();
          var CarerID = Carerval;
          ZOHO.CREATOR.init()
          .then(function(data) {
              // console.log("Testing");
              var config = {
                  appName : "hcd-admin",
                  reportName : "Client_Carers_Report",
                  criteria : '(Carer_Name == "'+CarerID+'" && Add_3 == true)',
                  page : 1
              }
          
              ZOHO.CREATOR.API.getAllRecords(config).then(function(response){
                  var recordArr = response.data;
                  console.log(recordArr);
                  for(var index in recordArr){
                      console.log(recordArr[index].Clients.display_value  + ClientN);
                      Name = recordArr[index].Clients.display_value.trim();
                      // // var var1 = document.createElement("option");
                      // // var1.setAttribute("customer_name",recordArr[index].CUSTOMER_ID.display_value);
                  if (ClientN  == Name)
                  {
                      var temp_4= '<option id="dropdownname_cl_popup"  Select cl_rec_id="'+recordArr[index].Clients.ID+'" client_name="'+recordArr[index].Clients.display_value+'">'+recordArr[index].Clients.display_value+'</option>';
                      $('#dropdownname_cl_popup').append(temp_4);
                  }  
                  if (ClientN == null)
                  {
                      var temp_6= '<option id="dropdownname_cl_popup"   cl_rec_id="'+recordArr[index].Clients.ID+'" client_name="'+recordArr[index].Clients.display_value+'">'+recordArr[index].Clients.display_value+'</option>';
                  
                  }
              }
  
              if (ClientN == null)
                  {
                      var temp_5= '<option id="dropdownname_cl_popup"   >'+"Select client"+'</option>';
                      $('#dropdownname_cl_popup').append(temp_5);
                      $('#dropdownname_cl_popup').append(temp_6);
                  
                  }
              
              });
          })
  
      })
  
  
  return 9;
  
  }
