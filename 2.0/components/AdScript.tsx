export function AdScript() {
    return (
        <script async src={process.env.AD_SCRIPT_URL}
            crossOrigin="anonymous">
        </script>
    );
}