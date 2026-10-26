# Pathora — Sample Data and Test Cases

These are manual test scenarios for the current UI and authentication integration. Use test accounts and avoid real sensitive personal data.

| ID | Area | Steps | Expected result |
|---|---|---|---|
| TC-001 | Landing | Open root URL | Landing page renders without a fatal error |
| TC-002 | Responsive UI | Test mobile and desktop widths | Text and controls remain usable |
| TC-003 | Navigation | Click each visible navigation link | Expected page/section opens |
| TC-004 | Signup validation | Submit empty required fields | Validation feedback appears |
| TC-005 | Signup validation | Enter invalid email | Invalid email is rejected |
| TC-006 | Signup | Register a new test email | Success or clear Supabase error appears |
| TC-007 | Email confirmation | Follow confirmation email if enabled | Link returns to configured Pathora URL |
| TC-008 | Login | Sign in with a confirmed test account | Session is created and expected page opens |
| TC-009 | Failed login | Enter an incorrect password | Login is rejected with understandable feedback |
| TC-010 | Session | Refresh after login | Session persists according to client configuration |
| TC-011 | Logout | Sign out | Session ends and protected content is unavailable |
| TC-012 | Environment | Test missing variable in a safe local environment | Clear configuration error; restore variable afterwards |
| TC-013 | Production | Test auth on Vercel domain | Redirects use production URL, not localhost |
| TC-014 | Build | Run `npm run build` | Build succeeds |
| TC-015 | Secret hygiene | Inspect tracked files | `.env.local` and private credentials are not committed |

## Illustrative test-account scenarios

Do not commit real passwords. Create test users directly in a development Supabase project.

```json
[
  {
    "scenario": "new_user_signup",
    "email": "pathora.test.user@example.com",
    "password": "<temporary-test-password-entered-only-in-test-environment>",
    "expected": "signup succeeds or shows the configured email-confirmation message"
  },
  {
    "scenario": "invalid_login",
    "email": "pathora.test.user@example.com",
    "password": "<incorrect-test-password>",
    "expected": "login is rejected with a clear error"
  }
]
```

The sample email is illustrative; this document does not create an account.

## Release test record
- Commit tested:
- Environment: Local / Preview / Production
- Browser/device:
- Tester:
- Date:
- Passed cases:
- Failed cases / issue links:

**Automation status:** These are manual test cases, not automated tests. No test runner is claimed by this document.
