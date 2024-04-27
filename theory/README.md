# Ответ на теоретический вопрос!

```javascript
  const arr = [10, 12, 15, 21];
  
  for(var i = 0; i < arr.length; i++) {
      setTimeout(function() {
          console.log(arr[i] > 13? `Good: ${arr[i]}` : `Bad ${arr[i]}`);
      }, 3000);
  }
```
Данный код выведит timerId "идентификатор таймера" а после 4 раза "Bad undefined"

### 2 варианта модификации кода

1. Заменить var на let
2. Оставляем var и используем замыкание
```javascript  
  for(var i = 0; i < arr.length; i++) {
      (function(i) {
          setTimeout(function() {
          console.log(arr[i] > 13? `Good: ${arr[i]}`: `Bad ${arr[i]}`);
      }, 3000);
      }(i));
  }
```

В каждой итерации будет создана область видимости с текущим индексом(i)
