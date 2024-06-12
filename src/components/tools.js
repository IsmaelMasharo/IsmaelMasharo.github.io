import { html } from "npm:htl"
import { ascending } from "npm:d3"
import { Observable10 } from '../utils/constants.js'

// Copyright 2021 Observable, Inc.
export function longList(tools, description) {
  const categories = [...new Set(tools.map((tool) => tool.category))].map(
    (id) => ({ id, label: id })
  )
  return html`
    <div>
      <style>
        .tools-container {
          font-family: var(--sans-serif);
          font-size: 12px;
          display: flex;
          align-items: flex-start;
          gap: 20px;
          padding: 30px 0 20px 0;
        }
        .tools-container .sidebar {
          width: 100px;
          flex: 1 0 auto;
        }
        @media only screen and (min-width: 600px) {
          .tools-container .sidebar {
            width: 140px;
          }
        }
        .tools-container .big-number {
          font-family: "Source Serif Pro";
          font-size: 16px;
          line-height: 1.5em;
        }
        .tools-container .big-number b {
          display: block;
          font-size: 48px;
          line-height: 48px;
          margin-bottom: 4px;
        }
        .tools-container .color-key {
          border-top: solid 1px var(--theme-foreground-faintest);
          margin-top: 20px;
          padding-top: 20px;
          width: 100%;
        }
        .tools-container .color {
          display: flex;
          gap: 8px;
          margin-top: 2px;
          display: flex;
          align-items: center;
        }
        .tools-container .swatch {
          width: 12px;
          height: 12px;
          border-radius: 4px;
        }
        .tools-container .tools {
          display: flex;
          gap: 4px;
          flex-wrap: wrap;
        }
        .tools-container .tool {
          border-radius: 4px;
          padding: 2px 4px;
        }
        .tools-container .category-Data {
          background-color: ${Observable10[0]};
        }
        .tools-container .category-Developer {
          background-color: ${Observable10[1]};
          color: var(--theme-background);
        }
        .tools-container .category-Communication {
          background-color: ${Observable10[3]};
          color: var(--theme-background);
        }
        .tools-container .category-Analytics {
          background-color: ${Observable10[6]};
        }
        .tools-container .category-Design {
          background-color: ${Observable10[2]};
          color: var(--theme-background);
        }
        .tools-container .category-Collaboration {
          background-color: ${Observable10[5]};
        }
        .tools-container .category-Business {
          background-color: ${Observable10[8]};
        }
        .tools-container .category-Other {
          background-color: ${Observable10[7]};
        }
      </style>
      <div class="tools-container">
        <div class="sidebar">
          <div class="big-number"><b>${tools.length}</b> ${description}</div>
          <div class="color-key">
            <div>
              ${categories
                .sort((a, b) => ascending(a.order, b.order))
                .map(
                  (category) => html`<div class="color">
                    <div class="swatch category-${category.id}"></div>
                    ${category.label}
                  </div>`
                )}
            </div>
          </div>
        </div>
        <div class="tools">
          ${tools
            .sort()
            .map(
              (tool) =>
                html`<span class="tool category-${tool.category}"
                  >${tool.tool}</span
                >`
            )}
        </div>
      </div>
    </div>
  `
}
