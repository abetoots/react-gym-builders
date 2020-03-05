
Guiding Principles:
1) Hooks that need global UI updates must receive a dispatch function
2) Else, hooks that update only the component which calls it can follow this pattern:
     const [loading, setLoading] = useState({ isLoading: false, called: false});
     const [success, setSuccess] = useState({ isSuccess: false, data: [] });
     const [error, setError] =     useState({ isError: false, output: "" });

    useEffect(() => {
        if (success.isSuccess || error.isError) {
        setLoading({ ...loading, isLoading: false });
        }
    }, [success, error]);
