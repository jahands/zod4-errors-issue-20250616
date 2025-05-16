import { assert, describe, expect, it, test } from 'vitest'
import { z } from 'zod/v4'

describe('zod v4', () => {
	describe('safeParse()', () => {
		it('returns error that is not an instance of z.ZodError', () => {
			const res = z.string().safeParse(5)
			expect(res.data).toBeUndefined()
			expect(res.error).not.toBeUndefined()
			expect(res.error).toMatchInlineSnapshot(`
				ZodError {
				  "issues": [
				    {
				      "code": "invalid_type",
				      "expected": "string",
				      "message": "Invalid input: expected string, received number",
				      "path": [],
				    },
				  ],
				}
			`)

			// WHY???
			expect(res.error).not.toBeInstanceOf(z.ZodError)
			expect(res.error instanceof z.ZodError).toBe(false)
		})
	})
})
