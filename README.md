# COMP5347_Web_Application_Development

Node.js Project of COMP5347 Web Application Development

---

## Introduction

This is a data analytic web application with three-tiered architecture. It is required to query and compute various summary analytics at server side and present the results on a web page.

[Demo]()

## How to use

> **This project invokes google's APIs for drawing charts, if you are in China, you may need a VPN for correct charts.**

1. Install `MongoDB`. You can find the Wikipedia history dataset from [dataset](dataset). And import the dataset into `Revision` collection.

2. Clone this repo to your device and install all dependencies.

    ```bash
    git clone https://github.com/StoneLyu/COMP5347_Web_Application_Development.git
    cd COMP5347_Web_Application_Development
    npm install
    ```

3. Connect this project to your database. Just modify the database connection file [db.js](app/models/db.js).

4. Before running this project, execute

    ```bash
    cd app/script
    node updateType.js
    ```

    for data pre-processing.

5. run this project

    ```bash
    node server.js
    ```

## Dataset

The dataset contains a number of files in JSON formats storing revision histories of Wikipedia articles.

Fields in the dataset:
    - title: stores the title of the article
    - timestamp: stores the date and time a revision was made
    - user: stores the user name or IP address of the user that made the revision
    - anon: the presence of the field indicates that the revision is made by anonymous users.

## Functional Requirements

- Main/Landing Page
- Wiki Analytics FunctionsYour
    1. *Overall Analytics*
    For overall analytics, you need to find out and display the following as text:
        - Titles of the three articles with highest number of revisions. This is the default behavior.
        - Titles of the three articles with lowest number of revisions. This is the default behavior.
        - The user should be provided with a way to change the number of articles for highest and lowest number of revisions, the same number should be applied to both categories.
        - The article edited by largest group of registered users. Each wiki article is edited by a number of users, some making multiple revisions. The number of unique users is a good indicator of an article’s popularity.
        - The article edited by smallest group of registered users.
        - The top 3 articles with the longest history (measured by age). For each article, the revision with the smallest timestamp is the first revision, indicating the article’s creation time. An article’s age is the duration between now and its creation time.
        - Article with the shortest history (measured by age).
        - A bar chart of revision number distribution by year and by user type across the whole dataset.
        - A pie chart of revision number distribution by user type across the whole data set.
    2. *Individual Article Analytics*
    For the selected article, display the following summary information:
        - The title
        - The total number of revisions
        - The top 5 regular users ranked by total revision numbers on this article, and the respective revision numbers.
        - A bar chart of revision number distributed by year and by user type for this article.
        - A pie chart of revision number distribution based on user type for this article.
        - A bar chart of revision number distributed by year made by one or a few of the top 5 users for this article.
    3. *Author Analytics*
    You should display the articles’ names along with number of revisions made by that author next to it. The end user should also be able to select to see time stamps of all revisions made to an article, if that author made more than revision to an article he is attributed with.