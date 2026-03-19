
## Track B — Middle

## 1. What risks or pain points you expect in a product like this

Một nền tảng SaaS giúp các cửa hàng online kết nối với các dịch vụ bên ngoài (như vận chuyển, thanh toán, notification…) sẽ phải đối mặt với những khó khăn trong quá trình phát triển sản phẩm và nhiều rủi ro về mặt kỹ thuật.

Dưới đây là một số rủi ro có thể gặp phải:

### 1.1 Phụ thuộc vào hệ thống bên thứ ba

Hệ thống phụ thuộc nhiều vào các dịch vụ bên ngoài như đơn vị vận chuyển hoặc cổng thanh toán.

Một số rủi ro có thể xảy ra:

- API phản hồi chậm hoặc không ổn định  
- Downtime từ phía provider  
- Provider thay đổi API hoặc Logic xử lí  
- Dữ liệu trả về không nhất quán  

Những điều này có thể dẫn tới việc khó khăn trong qua trình phát triển và khả năng dữ liệu sẽ không đồng nhất giữa các bên.

Để giảm rủi ro, hệ thống nên có:

- Thêm cơ chế retry ( có thể làm tự động hoặc bằng tay) 
- Có cơ chế xử lí timeout khi gọi API  
- Xử lí bất đồng bộ (có thể thêm các cronjob để chủ động sync dữ liệu theo từng giờ)  
- Thêm các cơ chế theo dõi tình trạng vận hành của hệ thống


### 1.2 Độ phức tạp khi tích hợp nhiều dịch vụ

Mỗi dịch vụ bên ngoài có thể có các cơ chế giao tiếp khác nhau nên độ phức tạp của hệ thống bị tăng cao dẫn tới khó khăn trong thời gian đầu phát triển và bảo trì hệ thống. Một số trường hợp có thể xảy ra như là :

- Cách authentication khác nhau  => khó khăn trong setting các thông số và cơ chế refresh token
- Cấu trúc request/response khác nhau  => khó mapping dữ liệu với hệ thống 
- Quy trình xử lý khác nhau => logic của mỗi dịch vụ sẽ khác biệt => hệ thống phức tạp 


### 1.3 Đồng bộ trạng thái giữa nhiều hệ thống

Trong hệ thống này,  trạng thái của đơn hàng phục thuộc vào các bên cung cấp dịch vụ khác dẫn tới có thể xảy ra việc delay hoặc không đồng bộ trạng thái đơn hàng, trạng thái vận chuyển.

Một số vấn đề thường gặp:

- Update từ shipping provider bị delay  
- Event bị gửi nhiều lần 
- Lỗi xảy ra ở giữa nhiều bước xử lý dẫn đến miss đơn hàng 


### 1.4 Rủi ro trong quá trình phát triển sản phẩm

Ngoài các vấn đề kỹ thuật, quá trình phát triển sản phẩm cũng có thể gặp một số khó khăn.

#### Kiến trúc không cố định

Khi mà hệ thống cần thêm hoặc bổ sung một dịch vụ bên ngoài mới, có cấu trúc và logic khác biệt => phải phát triển thêm để đảm bảo hỗ trợ thêm tính năng hoạt động bình thường.

#### Tài liệu của các provider có thể không chính xác với thực tế

Một số provider có tài liệu bị cũ hoặc bị sai , không chính xác, thâm chí là không public => gặp khó khăn khi phát triển và kiểm thử

#### Cơ chế Auth của provider

Một số dịch vụ có cơ chế auth MFA cần auth thông qua code hoặc login trên ui hoặc thời gian token có hạn ngắn => cần điều chỉnh phù hợp cho từng hệ thống.

---

## 2. What you would prioritize improving in the next 2–3 months

Trong giai đoạn đầu của sản phẩm, em sẽ ưu tiên xây dựng **một nền tảng ổn định với các tính năng cơ bản như tạo cửa hàng, tạo order , list order, thanh toán, tích hợp dịch vụ vận chuyển và xử lý đơn hàng **. Để đảm bảo luồng chính của sản phẩm hoạt động ổn định và có thể đưa vào thử nghiệm trên quy mô nhỏ hoặc demo cho khách hàng.



### 2.1 Tăng độ ổn định khi giao tiếp với các providers

Muốn hệ thống hoạt động ổn định thì cần phải đảm bảo việc giao tiếp với các dịch vụ bên ngoài ổn định, chính xác và nắm bắt các vấn đề sớm nhất có thể. Để tăng độ tin cậy cho hệ thống thì chúng ta có thể triển khai các điều sau:

- Sử dụng **job queue** cho các tác vụ gọi API bên ngoài  ( có thể dùng queue cho notify , update order)
- Thêm cơ chế retry (phải cố định số lượng retry => nếu quá nhiều lần thì có thể notify cho admin) 
- Timeout khi gọi API  
- Logging các lỗi integration  

Điều này giúp hệ thống hoạt động ổn định và admin có thể nắm bắt được tình trạng khi provider gặp lỗi tạm thời.


### 2.2 Xây dựng framework cho integrations

Khi số lượng integration tăng lên, việc có một cách tổ chức rõ ràng là rất quan trọng.

Ví dụ:

- Định nghĩa interface chung cho các providers.  
- Mỗi provider implement một adapter riêng.
- Tách logic của provider khỏi business logic.

Điều này giúp việc thêm provider mới dễ dàng hơn và giảm ảnh hưởng đến hệ thống hiện tại.

### 2.3 Cải thiện khả năng quan sát hệ thống (observability)

Khi hệ thống bắt đầu tích hợp nhiều dịch vụ thì việc theo dõi hệ thống nó là quan trọng. Em nghĩ mình có thể triển khai một số tính năng để tăng khả năng quan sát như là:

- Structured logging  
- Theo dõi latency của API  
- Monitoring các background jobs
- Notify qua các kênh khi các trường hợp bên provider bị lỗi

=> giúp team phát hiện và xử lý sự cố sớm và nhanh hơn. Tránh việc call API không hiệu quả gây sập server hay tổn thất về tài chính.

### 2.4 Tập trung vào workflow chính của merchant

Ở giai đoạn đầu, em sẽ ưu tiên đảm bảo các workflow chính hoạt động ổn định như là:

- Merchant onboarding  
- Tạo và quản lý đơn hàng  
- Kết nối đơn vị vận chuyển  
- Xử lý thanh toán  

Việc đảm bảo các tính năng cốt lõi hoạt động tốt sẽ là nền tảng để phát triển thêm các tính năng sau này.

---

## 3. One decision or improvement you would intentionally postpone, and why Explain your reasoning clearly.



Một quyết định em sẽ chưa tiến hành triển khai liền là **tối ưu hóa hệ thống cho quy mô rất lớn quá sớm**.

Ví dụ:

- Thiết kế infrastructure cho hàng triệu request ngay từ đầu  
- Xây dựng hệ thống phân tán quá phức tạp khi traffic còn thấp  

Ở giai đoạn đầu, mục tiêu quan trọng hơn là:

- Đảm bảo hệ thống hoạt động ổn định  
- Hỗ trợ tốt các workflow chính của merchant  
- Giữ kiến trúc đủ đơn giản để dễ thay đổi

Khi hệ thống bắt đầu có nhiều người dùng hơn và có dữ liệu thực tế về traffic, team có thể đầu tư thêm vào:

- Scaling services  
- Caching  
- Database optimization  

Cách tiếp cận này giúp việc đẩy nhanh tốc độ phát triển ban đầu và sau này phần đó có thể tiến hành cải tiến khi dự án đã vào vận hành và lưu lượng người dùng tăng lên.

---

## AI Usage & Critical Thinking

> “To build a scalable SaaS product, start with a strong architecture and add all necessary infrastructure early so you don’t need to rewrite later.”

Em **không hoàn toàn đồng ý** với lời khuyên này.

Việc nghĩ trước về khả năng mở rộng là quan trọng, nhưng xây dựng quá nhiều infrastructure ngay từ đầu có thể làm tăng độ phức tạp và làm chậm quá trình phát triển sản phẩm. Điều này dẫn đến việc tốn nhân sự cũng như thời gian vào cái chưa thực sự cần thiết vào thời điểm ban đầu của dự án.



### Lí do

Trong thực tế, yêu cầu sản phẩm thường thay đổi khi vào quá trình vận hành và triển khai thêm các dịch vụ bên ngoài.

Nếu đầu tư quá nhiều vào kiến trúc phức tạp ngay từ đầu, team có thể:

- Xây dựng những thứ chưa thực sự cần thiết  
- Mất nhiều thời gian vào infrastructure thay vì phát triển tính năng  
- Phải thay đổi lại kiến trúc khi product direction thay đổi  

Một cách tiếp cận hợp lý hơn là **bắt đầu với kiến trúc đơn giản nhưng đáng tin cậy**, sau đó cải tiến dần khi hệ thống phát triển.

---

## Originality

Em có sử dụng tool AI (ChatGPT) như một công cụ hỗ trợ để sắp xếp lại các ý tưởng và giúp cách trình bày được rõ ràng, mạch lạc hơn. 
Các ý tưởng và lập luận chính trong bài đều dựa trên hiểu biết cá nhân của em. AI chủ yếu giúp em chỉnh sửa cách diễn đạt và bổ sung một vài ví dụ để phần giải thích dễ hiểu hơn.
Em xem AI như một công cụ trợ lý giúp tổng hợp, format, và review lại các ý tưởng một cách mạch lạc, chỉ ra các điểm cần cải thiện và góp ý cho giải pháp tổng thể. Từ kết quả đó em sẽ tinh chỉnh một cách phù hợp.
