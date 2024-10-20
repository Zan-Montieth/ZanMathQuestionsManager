/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "3tsr2crnh5sdl75",
    "created": "2024-10-20 04:02:41.841Z",
    "updated": "2024-10-20 04:02:41.841Z",
    "name": "Messages",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "iosivbif",
        "name": "field",
        "type": "text",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "6zgnfx0r",
        "name": "User",
        "type": "relation",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("3tsr2crnh5sdl75");

  return dao.deleteCollection(collection);
})
