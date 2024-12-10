const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    
    // Step 1: Go to the Vintage IT Academy website
    await page.goto('https://beta.vintageitacademy.com/', { waitUntil: 'load', timeout: 0 });

    // Step 2: Wait for courses section to load
    await page.waitForSelector('.course-card');  // Replace `.course-card` with actual selector for course items

    // Step 3: Extract course information
    const courses = await page.evaluate(() => {
        const courseArray = [];
        const courseElements = document.querySelectorAll('.course-card');  // Adjust selector as needed

        courseElements.forEach(course => {
            const title = course.querySelector('.course-title').innerText || 'No title';  // Replace `.course-title` with actual selector
            const description = course.querySelector('.course-description') ? course.querySelector('.course-description').innerText : 'No description';  // Replace with actual selector
            const duration = course.querySelector('.course-duration') ? course.querySelector('.course-duration').innerText : 'No duration';  // Replace with actual selector
            const price = course.querySelector('.course-price') ? course.querySelector('.course-price').innerText : 'No price';  // Replace with actual selector

            courseArray.push({
                title,
                description,
                duration,
                price
            });
        });

        return courseArray;
    });

    // Step 4: Log or save the results
    console.log(courses);

    // Optional: Save data to JSON
    const fs = require('fs');
    fs.writeFileSync('courses.json', JSON.stringify(courses, null, 2));

    await browser.close();
})();
