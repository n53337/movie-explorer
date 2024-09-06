# Movie Explorer App 🎬

This is a movie explorer app built with Next.js, Tailwind CSS, Shadcn UI, and TypeScript, TanStack Query, V5 and Axios.

![](/sc1.jpeg)
![](/sc2.jpeg)

# Table of Contents

## [Features](#features)

## [Getting Started](#getting-started)

## [Problem Overview](#problem-overview)

## [Solution Design](#solution-design)

## Features

- Responsive layout for mobile and desktop.
- Browse popular movies.
- Search for movies by title.
- View movie details in a modal with beautiful design.

## Getting Started

To get started, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/n53337/movie-explorer.git
```

2. Install dependencies:

```bash
npm install
// or
yarn install
```

3. Rename the `.env.example` file to `.env.local` and add your API token:

```bash
cp .env.example .env.local
```

4. Start the development server:

```bash
npm run dev
```

5. Open the [App](http://localhost:3000) in your browser to view the app. and Voila! 🎉

## Problem Overview

The task was to build a movie explorer app that interacts with the TMDb API, retrieves movie data, and offers a smooth user experience with:

    •	Data Fetching using Axios
    •	Caching and Pagination via TanStack Query V5
    •	Modal windows for detailed views
    •	A search feature to explore specific movies.

## Solution Design

![solution design](/solution-design.png)

### Data Fetching and Caching

I used TanStack Query V5 for its powerful caching capabilities. It reduces unnecessary API calls by caching previously fetched data. I also use custom hooks to make it easier to deal with the data fetching process.

### Pagination

I've implemented pagination using the `useInfiniteQuery` hook from TanStack Query V5. This hook allows you to fetch data in a paginated way. and i use the `Intersection Observer API` to trigger the loading of the next page when the user scrolls to the bottom of the current page.

### Debouncing

I also Debouncing technique to avoid "request spamming", so the user can only make a request every 500ms.

### Performance

I considered performance as a crucial aspect of the app, because it has so many assets (Images) to load, which can slow down the loading time. Espically for low network speeds. So I used the `next/image` component to optimize the image sizes. and the `lazy loading` technique, so that you only fetch images when they are needed.

## Built with ❤️ .
