async function postInputValue(data, url) {
  console.log('=====post input data=====');
  console.log(data);
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    mode: 'cors',
    body: JSON.stringify(data),
    
  });
  try {
    const results = await response.json();
    console.log('postData:');
    console.log(results); // why it didn't show?
    return results;
  } catch (error) {
    console.log("error", error);
  }
}

function postData(inputText) {
  console.log("::: Post Data :::");
  return postInputValue(inputText, 'http://localhost:8080/addTexts');
}

export { postData };