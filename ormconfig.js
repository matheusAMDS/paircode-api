const baseUrl = process.env.NODE_ENV === 'production' ? 'build/' : 'src/'
const ext = process.env.NODE_ENV === 'production' ? '.js' : '.ts'

module.exports = {
  "type": "postgres",
  "url": process.env.DATABASE_URL,
	"logging": false,
	"entities": [
    baseUrl + "entity/**/*" + ext,
  ],
	"migrations": [
    baseUrl + "migration/**/*" + ext,
	],
	"cli": {
		"entitiesDir": "src/entity",
		"migrationsDir": "src/migration",
		"subscribersDir": "src/subscriber"
	}
}