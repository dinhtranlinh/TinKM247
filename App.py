import requests
import json
import requests
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Sử dụng CORS cho dịch vụ Flask
@app.route('/api/products', methods=['GET'])
def get_products():
    # Thay thế access_token bằng token của bạn
    access_token = 'Token AIU4S9lfn9vz_SsvrpC3EXPKA5FHgd0I'

    headers = {
        'Authorization': f'{access_token}'
    }

    api_url = 'https://api.accesstrade.vn/v1/offers_informations/coupon'  # Thay thế URL API thực tế
    response = requests.get(api_url, headers=headers)

    if response.status_code == 200:
        response_data  = response.json()
        products = response_data .get('data', [])
        return jsonify(products)
    else:
        return jsonify(message='Failed to fetch products'), 500

if __name__ == '__main__':
    app.run(debug=True)
