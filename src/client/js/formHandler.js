import { checkInput } from "./checkInput";

function handleSubmit(event) {
  event.preventDefault()

  document.getElementById('polarity').innerHTML = '';
  document.getElementById('subjectivity').innerHTML = '';
  document.getElementById('text').innerHTML = '';
  
  let inputValue = document.getElementById('content').value;

  if (!checkInput(inputValue)){
      alert('Input some texts before submit!');
  } else {
    fetch(`http://localhost:8080/getData?texts=${encodeURIComponent(inputValue)}`)
    .then(res => {
        return res.json();
    })
    .then(function(res) {
        console.log(res);
        if(res.score_tag === 'P+'){
          document.getElementById('polarity').innerHTML = 'strong positive';
        } else if(res.score_tag === 'P'){
          document.getElementById('polarity').innerHTML = 'positive';
        } else if (res.score_tag === 'N'){
          document.getElementById('polarity').innerHTML = 'negative';
        } else if (res.score_tag === 'NEU'){
          document.getElementById('polarity').innerHTML = 'neutral';
        } else if (res.score_tag === 'N+'){
          document.getElementById('polarity').innerHTML = 'strong negative';
        } else if (res.score_tag === 'NONE'){
          document.getElementById('polarity').innerHTML = 'without polarity';
        }

        document.getElementById('subjectivity').innerHTML = res.subjectivity;
        document.getElementById('text').innerHTML = res.sentence_list[0].text;
    })
    .catch((error) => {
        console.error("Error:", error);
    });
  }
    
}

export { handleSubmit }