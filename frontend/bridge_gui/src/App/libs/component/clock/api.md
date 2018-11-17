### 时钟组件api
****
__anti__:*Boolean*,true为倒计时，false为正计时，默认false;  
**start**:*Number/String*,开始时间，单位为毫秒；  
**startEvent**:*Function*,一开始就触发的事件；  
**end**:*Number/String*,结束时间，单位为毫秒，达到结束时间计时器降停止计时；  
**endEvent**:*Function*,结束时触发的事件，参数为计时器所记录的有效时间；  
**pause**：*Boolean*,计时器是否暂停，默认为false；  
**pauseEvent**:*Function*,暂停结束触发的事件；参数为暂停经过的时间；  
**wraningLine**：*Number/String*，警戒线，达到提示的警戒线计时器会闪烁提醒;  
**mount**：*Boolean*：控制时钟是否显示；
**unMount**:*Function*,时钟消失时（组件卸载时）触发的事件； 参数为有效计时和暂停时间记录。  
**style**：*Object*，时钟的样式；

