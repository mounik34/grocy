$(".numberpicker-down-button").unbind('click').on("click", function()
{
	var inputElement = $(this).parent().parent().find('input[type="number"]');
	inputElement.val(parseFloat(inputElement.val()) - 1);
	inputElement.trigger('keyup');
	inputElement.trigger('change');
});

$(".numberpicker-up-button").unbind('click').on("click", function()
{
	var inputElement = $(this).parent().parent().find('input[type="number"]');
	inputElement.val(parseFloat(inputElement.val()) + 1);
	inputElement.trigger('keyup');
	inputElement.trigger('change');
});

$(".numberpicker").on("keyup", function()
{
	if ($(this).attr("data-not-equal") && !$(this).attr("data-not-equal").toString().isEmpty() && $(this).attr("data-not-equal") == $(this).val())
	{
		$(this)[0].setCustomValidity("error");
	}
	else
	{
		$(this)[0].setCustomValidity("");
	}
});

$(".numberpicker").each(function()
{
	new MutationObserver(function(mutations)
	{
		mutations.forEach(function(mutation)
		{
			if (mutation.type == "attributes" && (mutation.attributeName == "min" || mutation.attributeName == "max" || mutation.attributeName == "data-not-equal"))
			{
				var element = $(mutation.target);
				var min = element.attr("min");
				var max = element.attr("max");
				var decimals = element.attr("data-decimals");

				if (element.hasAttr("data-not-equal"))
				{
					var notEqual = element.attr("data-not-equal");

					if (max.isEmpty() || max.startsWith("999999"))
					{
						element.parent().find(".invalid-feedback").text(__t("This cannot be lower than %1$s or equal %2$s and needs to be a valid number with max. %3$s decimal places", parseFloat(min).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: decimals }), parseFloat(notEqual).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: decimals }), decimals));
					}
					else
					{
						element.parent().find(".invalid-feedback").text(__t("This must be between %1$s and %2$s, cannot equal %3$s and needs to be a valid number with max. %4$s decimal places", parseFloat(min).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: decimals }), parseFloat(max).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: decimals }), parseFloat(notEqual).toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals }), decimals));
					}

					return;
				}

				if (max.isEmpty() || max.startsWith("999999"))
				{
					element.parent().find(".invalid-feedback").text(__t("This cannot be lower than %1$s and needs to be a valid number with max. %2$s decimal places", parseFloat(min).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: decimals }), decimals));
				}
				else
				{
					element.parent().find(".invalid-feedback").text(__t("This must between %1$s and %2$s and needs to be a valid number with max. %3$s decimal places", parseFloat(min).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: decimals }), parseFloat(max).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: decimals }), decimals));
				}
			}
		});
	}).observe(this, {
		attributes: true
	});
});
$(".numberpicker").attr("min", $(".numberpicker").attr("min")); // Dummy change to trigger MutationObserver above once
