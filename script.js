document.addEventListener('DOMContentLoaded', function() {
    // Fetch the JSON content
    fetch('content.json')
        .then(response => response.json())
        .then(content => {
            loadSocialIcons(content);
            if (document.body.contains(document.getElementById('focalArea'))) {
                loadFocalAreas(content);
            } else if (document.body.contains(document.querySelector('.contact-container'))) {
                loadAdditionalContactInfo(content);
            } else if (document.body.contains(document.querySelector('.posts-container'))) {
                loadDedicatedPageContent(content);
            }
        })
        .catch(error => console.error('Error fetching content:', error));
});

function loadSocialIcons(content) {
    const socialIcons = document.getElementById('socialIcons');
    content.footer.socialLinks.forEach(platform => {
        const a = document.createElement('a');
        a.href = platform.url;
        a.target = '_blank';
        let iconPath;
        switch(platform.name.toLowerCase()) {
            case 'youtube':
                iconPath = 'Assets/YoutubeLogo.svg.png';
                break;
            case 'x':
                iconPath = 'Assets/Xlogo.svg';
                break;
            case 'facebook':
                iconPath = 'Assets/FacebookLogo.svg.png';
                break;
        }
        a.innerHTML = `<img src="${iconPath}" alt="${platform.name}">`;
        socialIcons.appendChild(a);
    });
}

function loadFocalAreas(content) {
    const focalArea = document.getElementById('focalArea');
    content.main.focalAreas.forEach(area => {
        const div = document.createElement('div');
        div.className = 'focal-item';
        let postsHtml = '';
        area.posts.forEach(post => {
            postsHtml += `
                <div class="post-thumbnail">
                    <a href="${post.url}" target="_blank">
                        <p>${post.title}</p>
                    </a>
                </div>`;
        });
        div.innerHTML = `
            <h2>${area.title}</h2>
            <p class="tagline">${area.tagline}</p>
            <div class="posts-container">${postsHtml}</div>
            <a href="${area.pageUrl}" class="view-more">View More</a>`;
        focalArea.appendChild(div);
    });
}

function loadDedicatedPageContent(content) {
    const pageId = document.body.id;
    const pageContent = document.querySelector('.content-section .posts-container');
    const focalArea = content.main.focalAreas.find(area => area.pageUrl.includes(pageId));
    let postsHtml = '';
    focalArea.posts.forEach(post => {
        postsHtml += `
            <div class="post-thumbnail">
                <a href="${post.url}" target="_blank">
                    <p>${post.title}</p>
                </a>
            </div>`;
    });
    pageContent.innerHTML = postsHtml;
}

function loadAdditionalContactInfo(content) {
    const contactList = document.querySelector('.contact-container ul');
    content.contact.socialLinks.forEach(link => {
        const li = document.createElement('li');
        li.innerHTML = `${link.platform}: <a href="${link.url}" target="_blank">${link.handle}</a>`;
        contactList.appendChild(li);
    });
}