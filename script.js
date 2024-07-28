document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('bgVideo');
    const fallbackImage = document.getElementById('bgFallback');

    function handleVideoError() {
        if (video && fallbackImage) {
            video.style.display = 'none';
            fallbackImage.style.display = 'block';
        }
    }

    if (video) {
        video.addEventListener('error', handleVideoError);
        video.play().catch(handleVideoError);
    }
    fetch('content.json')
        .then(response => response.json())
        .then(content => {
            loadSocialIcons(content);
            loadMissionStatement(content);
            
            if (document.body.contains(document.getElementById('indexContent'))) {
                loadIndexContent(content);
            } else if (document.body.contains(document.getElementById('focalArea'))) {
                loadFocalAreas(content);
            } else if (document.body.contains(document.querySelector('.contact-container'))) {
                loadContactInfo(content);
            }
        })
        .catch(error => {
            console.error('Error fetching content:', error);
            const fallbackContent = '<p>Unable to load content at this time. Please try again later.</p>';
            document.querySelectorAll('.content-section').forEach(container => {
                container.innerHTML = fallbackContent;
            });
        });
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
function loadMissionStatement(content) {
    const missionStatement = document.getElementById('missionStatement');
    if (missionStatement) {
        missionStatement.innerHTML = `<p>${content.main.missionStatement}</p>`;
    }
}
function loadIndexContent(content) {
    const indexContent = document.getElementById('indexContent');
    const newContent = content.main.indexContent;
    
    let html = `
        <h2>${newContent.title}</h2>
        <ul>
            ${newContent.points.map(point => `<li>${point}</li>`).join('')}
        </ul>
        <p class="tagline">${newContent.tagline}</p>
    `;
    
    indexContent.innerHTML = html;
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
            <div class="posts-container">${postsHtml}</div>`;
        focalArea.appendChild(div);
    });
}
function loadContactInfo(content) {
    const contactInfo = content.contact;

    document.getElementById('contactTitle').textContent = contactInfo.title;
    document.getElementById('contactIntro').textContent = contactInfo.intro;
    
    const pointsList = document.getElementById('contactPoints');
    contactInfo.points.forEach(point => {
        const li = document.createElement('li');
        const strong = document.createElement('strong');
        strong.textContent = point.preface;
        li.appendChild(strong);
        li.appendChild(document.createTextNode(` ${point.description}`));
        pointsList.appendChild(li);
    });

    document.getElementById('contactConclusion').textContent = contactInfo.conclusion;
    document.getElementById('contactInfoTitle').textContent = contactInfo.contactInfoTitle;

    const methodsList = document.getElementById('contactMethods');
    contactInfo.contactMethods.forEach(method => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = method.contact;
        a.setAttribute('aria-label', method.type);
        if (method.iconClass) {
            const i = document.createElement('i');
            i.className = method.iconClass;
            a.appendChild(i);
        } else if (method.iconUrl) {
            const img = document.createElement('img');
            img.src = method.iconUrl;
            img.alt = `${method.type} Icon`;
            a.appendChild(img);
        }
        li.appendChild(a);
        methodsList.appendChild(li);
    });

    document.getElementById('scheduleTitle').textContent = contactInfo.scheduleTitle;
    
    const calendlyWidget = document.getElementById('calendlyWidget');
    calendlyWidget.setAttribute('data-url', contactInfo.calendlyUrl);

    const script = document.createElement('script');
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);
}




