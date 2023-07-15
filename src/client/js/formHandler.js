import { postData } from './postData';

function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let inputValue = document.getElementById('content').value;
    if (inputValue ===' ' || inputValue.length === 0){
        alert('Input some texts before submit!');
    } else {
        postData(inputValue,'http://localhost:8080/addTexts').then(getData()).then(updateUI());
    }
    
    // console.log("::: Form Submitted :::")
    // fetch('http://localhost:8080/addTexts')
    // .then(res => res.json())
    // .then(function(res) {
    //     document.getElementById('results').innerHTML = res.message
    // })

  };
  

  const getData = async () => {
    const res = await fetch('http://localhost:8080/getData');
    try {
      const data = await res.json();
      console.log(data);
      return data;
    } catch (err) {
      console.log(err.message);
    }
  };

  const updateUI = async () => {
    const request = await fetch('/getData');
    try{
      const allData = await request.json();
    //   console.log('updateUI:');
      console.log(allData);
      document.getElementById('polarity').innerHTML = allData.score_tag;
      document.getElementById('subjectivity').innerHTML = allData.subjectivity;
      document.getElementById('text').innerHTML = allData.sentence_list[0].text;
    }catch(error){
      console.log("error", error);
    }
  }
  
export { handleSubmit, getData, updateUI }