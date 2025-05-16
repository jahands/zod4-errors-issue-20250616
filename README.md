# zod4-errors-issue-20250616

Repro for a Zod v4 issue (specifically `zod@^3.25.0-beta.20250516T044623`) where the `error` object returned by `safeParse` is not an instance of `z.ZodError`.

## How to Reproduce

1.  **Clone the repository:**

    ```bash
    git clone git@github.com:jahands/zod4-errors-issue-20250616.git
    cd zod4-errors-issue-20250616
    ```

2.  **Install dependencies:**

    ```bash
    bun install
    ```

3.  **Run the tests:**

    ```bash
    bun run test
    ```

    You will see the test `returns error that is not an instance of z.ZodError` pass, confirming the issue where `res.error instanceof z.ZodError` is `false`.
