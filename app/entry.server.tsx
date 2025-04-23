import React from "react";
import type { EntryContext } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import { renderToPipeableStream } from "react-dom/server";
import { PassThrough } from "stream";
import { Readable } from "stream";

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  return new Promise((resolve, reject) => {
    const { pipe, abort } = renderToPipeableStream(
      React.createElement(RemixServer, {
        context: remixContext,
        url: request.url
      }),
      {
        onShellReady() {
          responseHeaders.set("Content-Type", "text/html");
          
          const body = new PassThrough();
          pipe(body);
          
          resolve(
            new Response(body as unknown as ReadableStream, {
              status: responseStatusCode,
              headers: responseHeaders,
            })
          );
        },
        onShellError(err) {
          reject(err);
        },
        onError(error) {
          console.error(error);
          reject(error);
        },
      }
    );

    setTimeout(abort, 5000);
  });
} 
