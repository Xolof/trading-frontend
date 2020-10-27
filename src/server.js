import { Server } from 'miragejs'

export function makeServer({ environment = "development" } = {}) {

let server = new Server({
  environment,

  routes() {

    this.namespace = "https://me-api.oljo.me"

    this.get("https://me-api.oljo.me/", () => {
        return {
          data: {
              status: 200,
              text: "# Om mig\n## Hej!\n\nJag heter Olof och jag bor i Åstorp..."
          }
        };
    })

    this.get("https://me-api.oljo.me/reports/week/1", () => {
        return {
          data: {
              status: 200,
              report: {
                  week: 1,
                  report: "# GitHub\n\n[Repo on GitHub](https://github.com/Xolof/me-app-jsramverk/)\n\n# README.md for 'me-app'\n\n## Install the necessary NPM modules:\n```\nnpm install\n```\n\n### Start the application:\n```\nnpm run serve\n```\n`",
              },
          }
        };
    })

    this.post("https://me-api.oljo.me/login", (schema, request) => {
        const body = JSON.parse(request.requestBody);

        let data = {};

        if (body.email === "user"
            && body.password === "pass") {
                data = {
                  data: {
                      status: 200
                  }
                }
            } else {
                data = {
                    data: {
                        status: 500
                    },
                    errors: {
                        message: "Login failed"
                    }
                }
            }
            return data;
    })
  },
  })

  return server
}
