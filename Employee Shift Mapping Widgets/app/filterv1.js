ZOHO.CREATOR.init()
        .then(function(data) {
            // console.log("Testing");
            var config = { 
                appName : "hcd-admin",
                  reportName : "Carers_Report", 
                page : 1
            }
            
            ZOHO.CREATOR.API.getAllRecords(config).then(function(response){
                var recordArr = response.data;
                console.log(recordArr);


                for(var index in recordArr){
                    // console.log(recordArr[index].Name.display_value);
                    // // var var1 = document.createElement("option");
                    // var1.setAttribute("customer_name",recordArr[index].CUSTOMER_ID.display_value);
                    var temp_1 = '<option id="dropdownname_cr" cr_rec_id="'+recordArr[index].ID+'" carer_name="'+recordArr[index].Name.display_value+'">'+recordArr[index].Name.display_value+'</option>';
                    $('#dropdownname_cr').append(temp_1);
                    var temp_2 = '<option id="dropdownname_cr_popup" cr_rec_id="'+recordArr[index].ID+'" carer_name="'+recordArr[index].Name.display_value+'">'+recordArr[index].Name.display_value+'</option>';
                    $('#dropdownname_cr_popup').append(temp_2);
                }	
            }); 
        })

        ZOHO.CREATOR.init()
        .then(function(data) {
            // console.log("Testing");
            var config = { 
                appName : "hcd-admin",
                  reportName : "Clients_Report", 
                page : 1
            }
            
            ZOHO.CREATOR.API.getAllRecords(config).then(function(response){
                var recordArr = response.data;
                // console.log(recordArr);
                for(var index in recordArr){
                    // console.log(recordArr[index].Name.display_value);
                    // // var var1 = document.createElement("option");
                    // // var1.setAttribute("customer_name",recordArr[index].CUSTOMER_ID.display_value);
                    var temp_3 = '<option id="dropdownname_cl" cl_rec_id="'+recordArr[index].ID+'" client_name="'+recordArr[index].Name.display_value+'">'+recordArr[index].Name.display_value+'</option>';
                    $('#dropdownname_cl').append(temp_3);
                    var temp_4= '<option id="dropdownname_cl_popup" cl_rec_id="'+recordArr[index].ID+'" client_name="'+recordArr[index].Name.display_value+'">'+recordArr[index].Name.display_value+'</option>';
                    $('#dropdownname_cl_popup').append(temp_4);
                }	
            }); 
        })

       
        ZOHO.CREATOR.init()
        .then(function(data) {
            // console.log("Testing");
            var config = { 
                appName : "hcd-admin",
                  reportName : "Shift_Report1", 
                page : 1
            }
            
            ZOHO.CREATOR.API.getAllRecords(config).then(function(shift_rep){
                var record_arr = shift_rep.data;
                for(var index in record_arr){
                    // console.log(recordArr[index].Name.display_value);
                    // // var var1 = document.createElement("option");
                    // // var1.setAttribute("customer_name",recordArr[index].CUSTOMER_ID.display_value);
                    var temp_5 = '<option id="dropdownname_sht" shift_rec_id="'+ record_arr[index].ID +'" shift_name="'+record_arr[index].Shift_Name+'">'+record_arr[index].Shift_Name+'</option>';
                    $('#dropdownname_sht').append(temp_5)
                }	
            }); 
        })    
