const ul = document.querySelector('ul');
const input = document.querySelector("input#input");
const recommended_soonurimal = document.querySelector("p#recommended_soonurimal")
const footer = document.querySelector("footer")

if (localStorage.getItem("recent_word")) {
    recommended_soonurimal.innerHTML = "최근 검색한 순우리말: " + localStorage.getItem("recent_word")
}

document.querySelector("button#submit").addEventListener("click", () => {
    search()
})
document.addEventListener("keyup", (e) => {
    if (e.keyCode === 13) {
        search()
    }
})

function search() {
    if (screen.width < 768) {
        footer.remove()
    }
    recommended_soonurimal.remove()
    document.querySelector("b#searched_word").innerHTML = input.value
    ul.innerHTML = "";
    let li = document.createElement("li");
    li.innerHTML = '검색중...'
    ul.appendChild(li)
    let word = input.value;
    let url = `http://opendict.korean.go.kr/api/search?certkey_no=3400&key=D34F025B51024A8569060A7DB7BF851A&target_type=search&req_type=json&part=word&q=${word}&sort=dict&start=1&num=10&advanced=y&type2=native`
    fetch("https://soonurimal-cors.herokuapp.com/" + url)
        .then(response => response.json())
        .then(data => {
            localStorage.setItem("recent_word", data.channel.item[0].word)
            ul.innerHTML = ""
            let n = 0
            while (n < data.channel.item.length) {
                let li = document.createElement("li");
                li.innerHTML = `${n + 1}. ${data.channel.item[n].sense[0].definition.replaceAll("<DR />", "")}`
                ul.appendChild(li)
                n++
            }
        })
        .catch(err => {
            ul.innerHTML = ""
            let li = document.createElement("li");
            li.innerHTML = '검색 결과가 없습니다. 검색어를 확인해주세요.'
            ul.appendChild(li)
            console.error(err)
        })
}