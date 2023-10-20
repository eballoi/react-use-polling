# React Use Polling

`react-use-polling` is a custom React hook that simplifies periodic polling with error handling in your React applications. It allows you to easily fetch and update data at regular intervals while handling errors gracefully.

## Installation

You can install the `react-use-polling` package from npm using the following command:

```bash
npm install @eballoi/react-use-polling
```

## Usage

To use the `usePolling` hook in your React components, follow these steps:

1.  Import the hook:

```JSX
import usePolling from '@eballoi/react-use-polling';
```

2.  Create a polling callback function that fetches your data. For example:

```JSX
const pollingCallback = async () => {
  // Your data fetching logic here
  const response = await fetchDataFromApi();
  return response.data;
};
```

3.  Set up polling options:

```JSX
const pollingOptions = {
  interval: 5000, // Polling interval in milliseconds (e.g., every 5 seconds)
  onError: (error) => {
    // Handle errors here (optional)
    console.error('Polling error:', error);
  },
};
```

4.  Use the `usePolling` hook within your component:

```JSX
const YourComponent = () => {
  const { data, loading, error } = usePolling(pollingCallback, pollingOptions);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && <p>Data: {data}</p>}
    </div>
  );
};
``` 

## API

### `usePolling(callback: () => Promise<any>, options: PollingOptions): PollingResult`

-   `callback`: A function that returns a promise, which should fetch the data for polling.

-   `options` (optional): An object containing polling configuration options:

    -   `interval` (number, required): The polling interval in milliseconds.
    -   `onError` (function, optional): A callback function to handle errors when they occur during polling.

### `PollingResult`

The `usePolling` hook returns an object with the following properties:

-   `data`: The latest data fetched during polling.
-   `loading`: A boolean indicating whether polling is in progress.
-   `error`: An error object if an error occurred during polling; otherwise, it's `null`.

## License

This project is licensed under the MIT License. See the [LICENSE](https://chat.openai.com/c/LICENSE) file for details.

## Contributors

-   [eballoi](https://github.com/eballoi)

## Issues and Contributions

If you encounter any issues or have suggestions for improvements, please open an issue on the [GitHub repository](https://github.com/eballoi/react-use-polling).

We welcome contributions via pull requests. Fork the repository and create a pull request with your changes.

## Changelog

See the [CHANGELOG](https://chat.openai.com/c/CHANGELOG.md) for information about the latest updates and changes to the package.
