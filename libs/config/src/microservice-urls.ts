export const microserviceUrls = {
    web: `${process.env.WEB_HOST || 'localhost'}:${process.env.WEB_PORT || '3000'}`,
    apiGateway: `${process.env.API_GATEWAY_HOST || 'localhost'}:${process.env.API_GATEWAY_PORT || '3000'}`,
    account: `${process.env.ACCOUN_GATEWAY_HOST || 'localhost'}:${process.env.ACCOUNT_PORT || '3010'}`,
    scan: `${process.env.SCAN_HOST || 'localhost'}:${process.env.SCAN_PORT || '3020'}`,
    productAnalyzer: `${process.env.PRODUCT_ANALYZER_GATEWAY_HOST || 'localhost'}:${process.env.PRODUCT_ANALYZER_PORT || '3030'}`,
    ingredientsRecognition: `${process.env.INGREDIENTS_RECOGNITION_GATEWAY_HOST || 'localhost'}:${process.env.INGREDIENTS_RECOGNITION_PORT || '3002'}`,
}