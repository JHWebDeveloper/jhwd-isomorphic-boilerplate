/**
 * automatically refresh chrome tabs displaying url format http://localhost:<PORT>/
 * Requires chrome-cli https://github.com/prasmussen/chrome-cli
 * 
 * Based on https://gist.github.com/emiloberg/2a6f1539c84603a18878
 */

import { exec } from 'child_process'

const createLocalhostRegex = port => new RegExp(`\\[(?:\\d+\\:+)*(\\d+)\\] http\\:\\/\\/localhost\\:${port}\\/`, 'g')

export const reload = port => {
	exec('chrome-cli list links', (err, stdout) => {
		if (err) return console.error(err)
	
		const localhostRegex = createLocalhostRegex(port)
		let match = false

		while ((match = localhostRegex.exec(stdout)) !== null) {
			const tabId = match[1]

			exec(`chrome-cli reload -t ${tabId}`, reloadErr => {
				if (reloadErr) return console.error(reloadErr)

				console.log(`Refreshed Chrome tab id ${tabId}`) // eslint-disable-line no-console
			})
		}
	})
}
