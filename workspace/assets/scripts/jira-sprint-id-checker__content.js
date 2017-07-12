'use strict';

const $ = require('jquery');

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
  function onInit() {
    checkJiraSprintID();
  }

  function checkJiraSprintID() {
    // Sample
    // <div data-sprint-id="710" class="ghx-backlog-container ghx-sprint-active js-sprint-container ghx-closed ui-droppable">
    const $targetElement = $('.js-sprint-container');

    if ($targetElement.length > 0) {
      $('body').append(
        `
          <style>
            .jiraSprintIdChecker__display-sprintId {
              font-style: italic;
            }

            .jiraSprintIdChecker__dialog:hover {
              opacity: 1;
            }

            .jiraSprintIdChecker__display-sprintId > dl {
              display: flex;
              font-weight: bold;
              color: #DC0000;
            }

            .jiraSprintIdChecker__display-sprintId > dl:before {
              content: '-';
              margin: 0 0.5em;
            }

            .jiraSprintIdChecker__display-sprintId > dl > dt:after {
              content: ':';
            }

            .jiraSprintIdChecker__display-sprintId > dl > dd {
              margin-left: 0.5em;
            }
          </style>
        `
      );

      $targetElement.each(function() {
        const targetSprintId = $(this).data('sprint-id');
        const targetPositionElement = $(this).find('.ghx-issue-count');

        if (targetSprintId) {
          targetPositionElement.after(
            `
              <div class="ghx-issue-count jiraSprintIdChecker__display-sprintId">
                <dl>
                  <dt>Sprint ID</dt>
                  <dd>${targetSprintId}</dd>
                </dl>
              </div>
            `
          );
        }
      });
    }
  }

  onInit();
});
