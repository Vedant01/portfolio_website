import * as React from "react";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction, MetaFunction } from "@remix-run/node";
import styles from "~/styles/global.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
  { rel: "manifest", href: "/manifest.json" },
  { rel: "icon", href: "/favicon.ico" },
  { rel: "apple-touch-icon", href: "/icon-192.png" },
];

export const meta: MetaFunction = () => {
  return [
    { title: "Vedant's Portfolio" },
    { name: "description", content: "Portfolio website of Vedant" },
    { name: "theme-color", content: "#000000" },
  ];
};

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <html>
      <head>
        <title>Oh no!</title>
        <Meta />
        <Links />
      </head>
      <body>
        <div style={{ padding: "20px", textAlign: "center" }}>
          <h1>Something went wrong</h1>
          <p>{error.message}</p>
        </div>
        <Scripts />
      </body>
    </html>
  );
} 