import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PAGES_BY_SLUG } from './data/pagesData';
import CatedralPage from './components/CatedralPage';

export default function App() {
  const routes = [];

  for (const [slug, pageObj] of Object.entries(PAGES_BY_SLUG)) {
    routes.push(
      <Route
        key={slug}
        path={slug}
        element={<CatedralPage pageSlug={slug} />}
      />
    );
    if (pageObj.aliases) {
      for (const alias of pageObj.aliases) {
        routes.push(
          <Route
            key={`${slug}:${alias}`}
            path={alias}
            element={<CatedralPage pageSlug={slug} />}
          />
        );
      }
    }
  }

  return (
    <BrowserRouter>
      <Routes>
        {routes}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
