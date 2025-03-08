# App Router Structure

This app uses Next.js Route Groups to create separate layouts for different parts of the application.

## Route Groups

- `(main)` - Contains the main application routes with the sidebar, header, and regular app layout
- `(player)` - Contains the fullscreen video player routes with a dedicated layout without app navigation

## How it works

Route Groups are created by wrapping a folder name in parentheses: `(folderName)`. These folders allow us to:

1. Create multiple root layouts in the same application
2. Apply different layouts to different sections of the app
3. Organize routes without affecting the URL path

For example, `/watch/123` will use the `(player)` layout with a fullscreen video player, while `/movies` will use the `(main)` layout with the sidebar and navigation.

See [Next.js Route Groups documentation](https://nextjs.org/docs/app/building-your-application/routing/route-groups) for more information.
