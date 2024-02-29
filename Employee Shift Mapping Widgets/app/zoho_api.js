// ******************** Get Records Sections **********************
// ***** Get shift report Response *****
async function getEmpFunc(){
  var emplist=[];
  var config = { 
    appName : "hcd-admin",
    reportName : "Shift_Report", 
    page : 1
  }
  try{
    const cust_response = await ZOHO.CREATOR.API.getAllRecords(config);
    const recordArr = await cust_response.data;
    for(var index in recordArr){
      var rec_id = recordArr[index].ID;
      var start_date = recordArr[index].Start_Date;
      var end_date = recordArr[index].End_Date;
      var carer =recordArr[index].Carers.display_value.trim();
      var care_facilitators = recordArr[index]["Carers.Care_Facilitier"].trim();
      var subformrec=recordArr[index].Shift_Assign;
      if (subformrec.length > maximumcount)
      {
        maximumcount=subformrec.length;
      }
      for(var subindex in subformrec)
      {
        var Subform_ID = subformrec[subindex].ID;
        var linerec=subformrec[subindex].display_value;
        var splitdata=linerec.split(",");
        var temparr=[];
        temparr["EmpName"]=carer;
        temparr["end_date"]=end_date;
        temparr["start_date"]=start_date;
        temparr["shift"]=splitdata[1].trim();
        temparr["client"]=splitdata[0].trim();
        temparr["sub_ID"]= Subform_ID;
        temparr["rec_id"] = rec_id;
        temparr["care_facilitators"] = care_facilitators;
        emplist.push(temparr);
      }
    }
  } catch (error){
    console.log("error found on getting shift record",error);
  }
  return emplist;
}
// ***** Get shift report Response ends here *****

// ***** Get Carer Client Response *****
async function getCarerClientFunc(){
  var CarerList=[];
  var carerconfig = { 
    appName : "hcd-admin",
    reportName : "Carers_Report", 
    page : 1
  }
  try
  {
    const carer_response = await ZOHO.CREATOR.API.getAllRecords(carerconfig);
    const recordArr = await carer_response.data;
    var carer_fac_arr = [];
    for(var index in recordArr){
      var rec_id = recordArr[index].ID;
      var carerName = recordArr[index].Name.display_value;
      var Care_Facilitators = recordArr[index].Care_Facilitier || 0;
      
      $('.carerdataDD').append($('<option>', {
        value: rec_id,
        text: carerName,
        'cr_rec_id':rec_id,  // Example additional attribute
        'carer_name': carerName   // Another example additional attribute
      }));


      var temp_1 = '<option id="dropdownname_cr" cr_rec_id="'+recordArr[index].ID+'" carer_name="'+recordArr[index].Name.display_value+'">'+recordArr[index].Name.display_value+'</option>';
      $('#dropdownname_cr').append(temp_1);
      var temp_2 = '<option id="dropdownname_cr_popup" cr_rec_id="'+recordArr[index].ID+'" carer_name="'+recordArr[index].Name.display_value+'">'+recordArr[index].Name.display_value+'</option>';
      $('#dropdownname_cr_popup').append(temp_2);

      var temp={
        "carerID":rec_id,
        "carerName":carerName.trim(),
        "care_faci":Care_Facilitators
      }
      CarerList.push(temp);

      // push Care_Facilitators data to the list
      if(Care_Facilitators !=0)
      {
        carer_fac_arr.push(Care_Facilitators);
      }
    }
    const uniqueArrayvalue = [...new Set(carer_fac_arr)];
    uniqueArrayvalue.forEach(care_facilitator => {

      $('.carefacidataDD').append($('<option>', {
        value: care_facilitator,
        text: care_facilitator,
        'care_facilitier_name':care_facilitator
      }));
      var temp_6 = '<option id="dropdownname_cf" care_facilitier_name="'+care_facilitator+'">'+care_facilitator+'</option>';
      $('#dropdownname_cf').append(temp_6);
    });
  }catch (error)
  {
    console.log("error found:",error);
  }

  // second section to add client report starts
  try
  {
    const clinet_response = await ZOHO.CREATOR.API.getAllRecords({reportName : "Clients_Report", 
    page : 1});
    const clientrecordArr = await clinet_response.data;
    for(var cliindex in clientrecordArr){

      $('.clientdataDD').append($('<option>', {
        value: clientrecordArr[cliindex].ID,
        text: clientrecordArr[cliindex].Name.display_value,
        'cl_rec_id':clientrecordArr[cliindex].ID,
        'client_name': clientrecordArr[cliindex].Name.display_value
      }));
      var temp_3 = '<option id="dropdownname_cl" cl_rec_id="'+clientrecordArr[cliindex].ID+'" client_name="'+clientrecordArr[cliindex].Name.display_value+'">'+clientrecordArr[cliindex].Name.display_value+'</option>';
      $('#dropdownname_cl').append(temp_3);
      var temp_4= '<option id="dropdownname_cl_popup" cl_rec_id="'+clientrecordArr[cliindex].ID+'" client_name="'+clientrecordArr[cliindex].Name.display_value+'">'+clientrecordArr[cliindex].Name.display_value+'</option>';
      $('#dropdownname_cl_popup').append(temp_4);
    }
  }catch (error)
  {
    console.log("error found:",error);
  }
  // second section to add client report ends

  // third section to add shift details to popup starts
  try
  {
    const shift_response = await ZOHO.CREATOR.API.getAllRecords({reportName : "Shift_Report1",page : 1});
    const shiftrecordArr = await shift_response.data;
    for(var shiftindex in shiftrecordArr){
      var temp_5 = '<option id="dropdownname_sht" shift_rec_id="'+ shiftrecordArr[shiftindex].ID +'" shift_name="'+shiftrecordArr[shiftindex].Shift_Name+'">'+shiftrecordArr[shiftindex].Shift_Name+'</option>';
      $('#dropdownname_sht').append(temp_5)
    }
  }catch (error)
  {
    console.log("error found:",error);
  }
  // third section to add shift details to popup ends
  ClinetCarerReportFunc();
  return CarerList;
}
// ****** Get Carer Client Response ends here *****

// ***** Get Response from Client_carers report starts *****
async function ClinetCarerReportFunc(){
  var ClinetCarerList=[];
  var carerconfig = { 
    appName : "hcd-admin",
    reportName : "Client_Carers_Report",
    criteria : '(Add_3 == true)',
    page : 1
  }
  try
  {
    const clientcarer_response = await ZOHO.CREATOR.API.getAllRecords(carerconfig);
    const recordArr = await clientcarer_response.data;
    for(var index in recordArr){
      var rec_id = recordArr[index].ID;
      var carerName = recordArr[index].Carers;
      if (carerName)
      {
        carerName = recordArr[index].Carers.display_value || 0;
      }
      var ClientName = recordArr[index].Clients;
      if (ClientName)
      {
        ClientName = recordArr[index].Clients.display_value || 0;
      }
      ClientName=ClientName.replace(/\s+/g, ' '); 
      var temp={
        "recID":rec_id,
        "carerName":carerName.trim(),
        "clientName":ClientName.trim()
      }
      ClinetCarerList.push(temp);
    }
  }catch (error)
  {
    console.log("error found:",error);
  }
  ClientCarerReportList=ClinetCarerList;
  return ClinetCarerList;
}
// ****** Get Response from Client_carers report ends *****

//  ************************************************************************

// Create/ Update Delete Script

// ****** Create Emp Shift records starts *****
async function CreateEmpShiftFunc(finaldata){
  // console.log("finaldata",finaldata);
  var responseCode=0;
  try{
    const EmpShiftCreateResp = await ZOHO.CREATOR.API.addRecord({formName : "Employee_Shift",data : formData});
    responseCode= await EmpShiftCreateResp.code;
    console.log("EmpShiftCreateResp:",EmpShiftCreateResp);
  }catch(error){
    responseCode=0;
    console.log("error found",error);
  }
  return responseCode;
}
// ****** Create Emp Shift records ends *****

// ****** Update Emp Shift subform records starts *****
async function UpdateShiftAssignFunc(finaldata,recid){
  // console.log("finaldata",finaldata);
  var responseCode=0;
  try{
    const ShiftAssingUpdateResp = await ZOHO.CREATOR.API.updateRecord({reportName : "Shift_Assign_Report",id : recid,data : finaldata });
    responseCode= await ShiftAssingUpdateResp.code;
    console.log("ShiftAssingUpdateResp:",ShiftAssingUpdateResp);
  }catch(error){
    responseCode=0;
    console.log("error found",error);
  }
  return responseCode;
}
// ****** Update Emp Shift subform records ends *****

// ****** Create Emp Shift subform records starts *****
async function CreateShiftAssignFunc(finaldata){
  // console.log("finaldata",finaldata);
  var responseCode=0;
  try{
    const ShiftAssignCreateResp = await ZOHO.CREATOR.API.addRecord({formName : "Shift_Assign",data : finaldata});
    responseCode= await ShiftAssignCreateResp.code;
    console.log("ShiftAssignCreateResp:",ShiftAssignCreateResp);
  }catch(error){
    responseCode=0;
    console.log("error found",error);
  }
  return responseCode;
}
// ****** Create Emp Shift subform records ends *****

// ****** Find And Delete Shift Assign subform records starts ******
async function DeleteShiftAssignFunc(dates1,carerName,ShiftName){
  try{
    const foundItems = findDateInRangeDelete(Employee_Shift_List, dates1,carerName,ShiftName);
    console.log("foundItems:",foundItems);
    if (foundItems.length>0)
    {
      var recordID=foundItems[0].sub_ID;
      const DeleteShiftAssignResp = await ZOHO.CREATOR.API.deleteRecord({ 
        appName : "hcd-admin",
        reportName : "Shift_Assign_Report",
        criteria : '(ID == '+recordID+')'
      });
      console.log("DeleteShiftAssignResp:",DeleteShiftAssignResp);
    }
  }catch(error){
    console.log("error:",error);
  }
  return true;
}
// ****** Find And Delete Shift Assign subform records ends ******
//  ************************************************************************


async function GettingShiftAllocation(client_id,carer_id){
 
  ShiftAllocation = [];
  config = {
    appName : "hcd-admin",
    reportName : "Shift_Allocation_Report",
    criteria: '(Carers == '+carer_id+' && Clients == '+client_id+')',
    page : 1
  }
  try
  {
    const ShiftAllocation_response = await ZOHO.CREATOR.API.getAllRecords(config);
    const recordArr = await ShiftAllocation_response.data;
    for(var index in recordArr){
      var startDate = recordArr[index].Start_Date;
      var EndDate = recordArr[index].End_date;
      var temp= {
      "Start_Date":startDate,
        "End_date":EndDate
      }
      ShiftAllocation.push(temp);
    }
    return ShiftAllocation;
  }
  catch (error)
  {
    console.log("error found:",error);
    return 0;
  }
 
}