const URL = "http://localhost:3000";

export default class API {
  static createNote(userId, title, text) {
    const createdAt = Date.now();
    return API.fetch(`notes`, "POST", { userId, title, text, createdAt }).then(
      (response) => response.json()
    );
  }

  static signUp(email, password) {
    const createdAt = Date.now();
    return API.fetch("users", "POST", { email, password, createdAt }).then(
      (response) => response.json()
    );
  }

  static editNote(id, title, text) {
    return API.fetch(`notes/${id}`, "PATCH", {
      title,
      text,
    }).then((response) => response.json());
  }

  static deleteNote(id) {
    return API.fetch(`notes/${id}`, "DELETE").then((response) =>
      response.json()
    );
  }

  static getNote(id) {
    return API.fetch(`notes/${id}`).then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error("No such note found.");
    });
  }

  static getNotes(userId) {
    return API.fetch(`notes?userId=${userId}&_sort=-createdAt`).then(
      (response) => {
        if (response.ok) {
          return response.json();
        }

        throw new Error("No such notes found.");
      }
    );
  }
  static getUser(id) {
    return API.fetch(`users?id=${id}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }

        throw new Error("No such users found.");
      })
      .then((users) => users[0]);
  }
  static getUsers() {
    return API.fetch(`users`).then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error("No such users found.");
    });
  }

  static getUsersByQuery(query) {
    return API.fetch(`users?${query}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }

        throw new Error("No such users found.");
      })
      .then((users) => users[0]);
  }

  static fetch(endpoint, method = "GET", data = undefined) {
    return fetch(`${URL}/${endpoint}`, {
      method,
      body: data ? JSON.stringify(data) : undefined,
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
  }
}
