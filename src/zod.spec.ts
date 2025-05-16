import { assert, describe, expect, it, test } from 'vitest'
import { z as z3 } from 'zod'
import { z as z4 } from 'zod/v4'

describe('zod v4', () => {
	describe('safeParse()', () => {
		it('returns error that is not an instance of z.ZodError', () => {
			const res = z4.string().safeParse(5)
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

			// FIXED!!
			expect(res.error).toBeInstanceOf(z4.ZodError)
			expect(res.error instanceof z4.ZodError).toBe(true)
		})
	})

	describe('parse()', () => {
		it('throws error that is instance of z.ZodError', () => {
			expect(() => z4.string().parse(5)).toThrowError(z4.ZodError)

			let didThrow = false
			try {
				z4.string().parse(5)
			} catch (e) {
				didThrow = true
				expect(e).toBeInstanceOf(z4.ZodError)
			}
			expect(didThrow).toBe(true)
		})

		it('throws error that is an instance of Error', () => {
			let didThrow = false
			try {
				z4.string().parse(5)
			} catch (e) {
				didThrow = true
				expect(e).toBeInstanceOf(Error)
			}
			expect(didThrow).toBe(true)
		})
	})
})

describe('zod v3 vs v4 stringifying with vitest toMatchInlineSnapshot()', () => {
	test('zod v3', () => {
		let didThrow = false
		try {
			z3.string().parse(5)
		} catch (e) {
			didThrow = true
			expect(e).toMatchInlineSnapshot(`
				[ZodError: [
				  {
				    "code": "invalid_type",
				    "expected": "string",
				    "received": "number",
				    "path": [],
				    "message": "Expected string, received number"
				  }
				]]
			`)
			console.error(e) // outputs full error as expected
		}
		expect(didThrow).toBe(true)
	})

	test('zod v4', () => {
		let didThrow = false
		try {
			z4.string().parse(5)
		} catch (e) {
			didThrow = true
			expect(e).toMatchInlineSnapshot(`[Error]`)
			console.error(e) // outputs full error as expected
		}
		expect(didThrow).toBe(true)
	})
})
