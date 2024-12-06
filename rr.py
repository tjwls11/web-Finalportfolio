import gzip
from io import BytesIO

# HTTP 응답 데이터 (raw 데이터 입력)
raw_data = bytes.fromhex(
    "485454502f312e3120323030204f4b0d0a43616368652d436f6e74726f6c3a20707269766174650d0a436f6e74656e742d547970653a20746578742f68746d6c0d0a436f6e74656e742d456e636f64696e673a20677a69700d0a566172793a204163636570742d456e636f64696e670d0a5365727665723a204d6963726f736f66742d4949532f372e300d0a582d506f77657265642d42793a204153502e4e45540d0a446174653a205765642c2031382041756720323031302030343a33343a303320474d540d0a436f6e74656e742d4c656e6774683a203233300d0a0d0a1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ee3e4374e1eff1eef16657a99d74d512d3ffb6877bcf351fa7b1cd1e775deacaa65931f3dfe5dbf77f2f4f8cdf1f7d2dff367e66dbb7a74f7eed5d5d578bd9a656d3e5e14d3ba6aaaf3763cad1677ed5ff2edddcb4fefcef2f36c5db6e3ac59bdfb3d7fe6fbdf3f7a7cd782fe8d93ff07a66d902283000000"
)  # 주어진 데이터를 그대로 여기에 붙여넣기

# HTTP 헤더와 본문 분리
http_data = raw_data.split(b"\r\n\r\n", 1)  # 헤더와 본문은 빈 줄로 구분됨
headers = http_data[0]  # 헤더 부분
compressed_body = http_data[1]  # Gzip 압축된 본문

# Gzip 압축 해제
try:
    with gzip.GzipFile(fileobj=BytesIO(compressed_body)) as gz:
        decoded_data = gz.read()
    print(decoded_data.decode('utf-8'))  # 해제된 데이터 출력
except Exception as e:
    print("디코딩 오류:", e)
