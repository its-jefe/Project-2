const hungryBtn_el = document.getElementById('im-hungry');

async function pushedIt() {

    console.log('pushed it')
    // hungryBtn_el.style.display = 'none'

    // const response = await fetch(`/hungry`, {
    //     method: 'POST',
    //     body: JSON.stringify({ isHungry: false }),
    //     headers: {
    //         'Content-Type': 'application/json'
    //     }
    // });

    // if (response.ok) {
    //     console.log('Thine respawnse twas legit')
    //     console.log(response)
    //     // THEN...
    //     document.location.replace('/hungry');
    // } else {
    //     alert(response.statusText);
    // }

};

hungryBtn_el.addEventListener('click', pushedIt);